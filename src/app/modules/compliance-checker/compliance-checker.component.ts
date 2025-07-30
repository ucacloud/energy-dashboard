import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JsonPipe, NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-compliance-checker',
  standalone: true,
  imports: [JsonPipe, NgIf, NgFor],
  templateUrl: './compliance-checker.component.html',
  styleUrl: './compliance-checker.component.css'
})
export class ComplianceCheckerComponent {
  violations: any[] = [];
  selectedFile: File | null = null;
  isLoading = false;
  error = '';

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) return;

    const reader = new FileReader();
    reader.onload = () => {
      const logContent = reader.result as string;

      this.isLoading = true;
      this.error = '';
      this.http
        .post<any>('/api/compliance-check', { log: logContent })
        .subscribe({
          next: (response) => {
            this.violations = response.violations || [];
            this.isLoading = false;
          },
          error: (err) => {
            this.error = 'Failed to analyze log file.';
            this.isLoading = false;
          },
        });
    };

    reader.readAsText(this.selectedFile);
  }
}
