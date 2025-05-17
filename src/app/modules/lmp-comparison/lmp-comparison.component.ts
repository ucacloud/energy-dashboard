import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LmpService, LmpData } from '../../services/lmp.service';

@Component({
  selector: 'app-lmp-comparison',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lmp-comparison.component.html',
  styleUrls: ['./lmp-comparison.component.css'],
})
export class LmpComparisonComponent implements OnInit {
  comparisonData: LmpData[] | null = null;

  constructor(private lmpService: LmpService) {}

  ngOnInit(): void {
    this.lmpService.getLmpComparisonData().subscribe({
      next: (data) => (this.comparisonData = data),
      error: (err) => console.error('Failed to load LMP comparison data', err),
    });
  }
}