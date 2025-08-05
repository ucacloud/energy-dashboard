import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
    this.isLoading = true;
    this.error = null;
    this.violations = [];

    reader.onload = () => {
      const logContent = reader.result as string;

      this.http.post<any>('/api/compliance-check', { logContent }).subscribe({
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
