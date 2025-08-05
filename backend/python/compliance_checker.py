import argparse
import json
import os
import re
import sys
import time
from datetime import datetime

# --- Configuration embedded directly ---
config = {
    "violation_patterns": {
        "Failed Login": r"Failed password for (invalid user )?\w+ from \d+\.\d+\.\d+\.\d+",
        "Invalid User": r"Invalid user \w+ from \d+\.\d+\.\d+\.\d+",
        "Privilege Escalation": r"sudo: .*",
        "Sensitive File Access": r"/etc/shadow",
        "SSH Activity": r"sshd\[\d+\]:.*"
    },
    "log_levels": {
        "Failed Login": "ERROR",
        "Invalid User": "WARNING",
        "Privilege Escalation": "CRITICAL",
        "Sensitive File Access": "CRITICAL",
        "SSH Activity": "INFO"
    }
}

def parse_args():
    parser = argparse.ArgumentParser(description='Compliance Log Checker')
    parser.add_argument('--from-api', action='store_true', help='Flag for API mode')
    parser.add_argument('--logfile', type=str, help='Path to the log file')
    return parser.parse_args()

def extract_timestamp(line):
    match = re.match(r'^([A-Z][a-z]{2} +\d{1,2} +\d{2}:\d{2}:\d{2})', line)
    if match:
        return match.group(1)
    return "Unknown"

def parse_log_lines(log_lines, violation_patterns, log_levels):
    violations = []
    for index, line in enumerate(log_lines):
        stripped_line = line.strip()
        if not stripped_line:
            continue

        for violation_type, pattern in violation_patterns.items():
            if re.search(pattern, stripped_line):
                log_level = log_levels.get(violation_type, "INFO")
                timestamp = extract_timestamp(stripped_line)
                violations.append({
                    "line_number": index + 1,
                    "timestamp": timestamp,
                    "log_level": log_level,
                    "violation_type": violation_type,
                    "message": stripped_line
                })
    return violations

def generate_summary(violations):
    summary = {}
    for v in violations:
        v_type = v["violation_type"]
        summary[v_type] = summary.get(v_type, 0) + 1
    return summary

def save_json_report(violations, output_dir='output/json'):
    os.makedirs(output_dir, exist_ok=True)
    timestamp = datetime.now().strftime("%Y-%m-%d_%H%M%S")
    json_path = os.path.join(output_dir, f'violations_{timestamp}.json')

    with open(json_path, 'w') as json_file:
        json.dump(violations, json_file, indent=2)

    print(f"Report saved to {json_path}", file=sys.stderr)
    return json_path

def auto_delete_old_reports(folder_path, days_old=30):
    now = time.time()
    cutoff = now - (days_old * 86400)
    for filename in os.listdir(folder_path):
        file_path = os.path.join(folder_path, filename)
        if os.path.isfile(file_path) and os.path.getmtime(file_path) < cutoff:
            os.remove(file_path)
            print(f"Deleted old report: {file_path}", file=sys.stderr)

def main():
    args = parse_args()

    if args.from_api:
        print("---DEBUG: Received log input from API---", file=sys.stderr)
        log_content = sys.stdin.read()
        log_lines = log_content.splitlines()
    else:
        if not args.logfile or not os.path.exists(args.logfile):
            print("Error: Log file not found or not provided.", file=sys.stderr)
            sys.exit(1)
        with open(args.logfile, 'r') as f:
            log_lines = f.readlines()

    violations = parse_log_lines(
        log_lines,
        config["violation_patterns"],
        config["log_levels"]
    )

    summary = generate_summary(violations)

    # Console debug output
    if not violations:
        print("No violations found.", file=sys.stderr)
    else:
        print("\nSummary of Violations:", file=sys.stderr)
        for v_type, count in summary.items():
            print(f"{v_type}: {count}", file=sys.stderr)

    # Save report
    save_json_report(violations)
    auto_delete_old_reports('output/json')

    # Output for API use
    print("\n---Begin JSON Output---")
    print(json.dumps(violations, indent=2))
    print("---End JSON Output---")

if __name__ == "__main__":
    main()
