import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LmpService, LmpComparisonData } from '../../services/lmp.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-lmp-comparison',
  standalone: true,
  imports: [CommonModule, NgxChartsModule],
  templateUrl: './lmp-comparison.component.html',
  styleUrls: ['./lmp-comparison.component.css'],
})



export class LmpComparisonComponent implements OnInit {
  comparisonData: LmpComparisonData[] | null = null;
  chartData: any[] = [];
  view: [number, number] = [900, 400]; // width, height

  constructor(private lmpService: LmpService) {}

  ngOnInit(): void {
    this.lmpService.getLmpComparisonData().subscribe({
      next: (data) => this.formatChartData(data),
      error: (err) => console.error('Failed to load LMP comparison data', err),
    });
  }

  private formatChartData(data: LmpComparisonData[]): void {
    const nodeMap: { [key: string]: { name: string; series: any[] }[] } = {};

    data.forEach(entry => {
      const { node, timestamp, dayAhead, realTime } = entry;

      if (!nodeMap[node]) {
        nodeMap[node] = [
          { name: `${node} - Day Ahead`, series: [] },
          { name: `${node} - Real Time`, series: [] }
        ];
      }

      nodeMap[node][0].series.push({ name: timestamp, value: dayAhead });
      nodeMap[node][1].series.push({ name: timestamp, value: realTime });
    });

    this.chartData = Object.values(nodeMap).flat();
  }
}