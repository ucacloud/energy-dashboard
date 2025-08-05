import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplianceCheckerService } from '../../services/compliance-checker.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-compliance-checker',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './compliance-checker.component.html',
})

export class ComplianceCheckerComponent {
  selectedFile: File | null = null;
  violations: any[] = [];
  isLoading = false;
  error: string | null = null;

  sampleLog = `
Jul 23 09:12:44 localhost sshd[3021]: Failed password for root from 172.16.0.3 port 5000 ssh2
Jul 23 09:13:10 localhost sshd[3022]: Invalid user test from 172.16.0.3 port 5001
Jul 23 09:14:01 localhost sshd[3023]: Connection reset by 172.16.0.3 port 5002
Jul 23 09:15:12 localhost sudo:     admin : TTY=pts/1 ; PWD=/home/admin ; USER=root ; COMMAND=/usr/bin/vim /ect/shadow`;

  useSampleLog(): void {
    this.isLoading = true;
    this.error = null;
    this.violations = [];

    this.complianceCheckerService.checkCompliance(this.sampleLog)
      .subscribe({
        next: (response) => {
          console.log('Sample API Response:', response);
          this.violations = response || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'An error occurred while processing the sample log.';
          this.isLoading = false;
        },
      });
  }

  constructor(private complianceCheckerService: ComplianceCheckerService) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    this.isLoading = true;
    this.error = null;
    this.violations = [];

    reader.onload = () => {
      const logContent = reader.result as string;

      this.complianceCheckerService.checkCompliance(logContent).subscribe({
        next: (response) => {
          console.log('API Response:', response);
          this.violations = response || [];
          this.isLoading = false;
        },
        error: (err) => {
          console.error(err);
          this.error = 'An error occurred while processing the log file.';
          this.isLoading = false;
        },
      });
    };

    reader.onerror = () => {
      this.error = 'Failed to read the file.';
      this.isLoading = false;
    };

    reader.readAsText(this.selectedFile);
  }
}
