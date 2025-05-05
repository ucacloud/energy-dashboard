import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettlementService, Settlement } from '../../services/settlement.service';

@Component({
  selector: 'app-settlement-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './settlement-list.component.html',
  styleUrls: ['./settlement-list.component.css']
})
export class SettlementListComponent implements OnInit {
  settlements: Settlement[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private settlementService: SettlementService) {}

  ngOnInit(): void {
    this.settlementService.getSettlements().subscribe({
      next: (data) => {
        this.settlements = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load settlements.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}