import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LmpService, LmpData } from '../../services/lmp.service';

@Component({
  selector: 'app-lmp-breakdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lmp-breakdown.component.html',
  styleUrls: ['./lmp-breakdown.component.css'],
})
export class LmpBreakdownComponent implements OnInit {
  lmpData: LmpData[] | null = null;

  constructor(private lmpService: LmpService) {}

  ngOnInit() {
    this.lmpService.getLmpData().subscribe({
      next: (data) => (this.lmpData = data),
      error: (err) => console.error('Failed to load LMP data', err),
    });
  }
}
