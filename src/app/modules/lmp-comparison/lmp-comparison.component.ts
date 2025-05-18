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
  chartData: { name: string; series: { name: string; value: number }[] }[] = [];
  view: [number, number] = [900, 400]; // chart size [width, height]

  constructor(private lmpService: LmpService) {}

  ngOnInit(): void {
    this.lmpService.getLmpComparisonData().subscribe({
      next: (data) => this.formatChartData(data),
      error: (err) => console.error('Failed to load LMP comparison data', err),
    });
  }

  private formatChartData(data: LmpComparisonData[]): void {
    const seriesMap: { [key: string]: { name: string; series: { name: string; value: number }[] } } = {};

    data.forEach(({ node, timestamp, dayAhead, realTime }) => {
    
      const dayAheadKey = `${node} - Day Ahead`;
      const realTimeKey = `${node} - Real Time`;

      if (!seriesMap[dayAheadKey]) {
        seriesMap[dayAheadKey] = { name: dayAheadKey, series: [] };
      }
      if (!seriesMap[realTimeKey]) {
        seriesMap[realTimeKey] = { name: realTimeKey, series: [] };
      }

      seriesMap[dayAheadKey].series.push({ name: timestamp, value: dayAhead });
      seriesMap[realTimeKey].series.push({ name: timestamp, value: realTime });
    });

    this.chartData = Object.values(seriesMap);

    this.chartData.forEach(seriesObj => {
      seriesObj.series.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());
    });
  }

  xAxisTickFormatting = (value: string) => {
    const date = new Date(value);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
}