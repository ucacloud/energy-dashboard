import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Price, PricesService } from '../services/prices.service';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css'],
})
export class PricesComponent {
  // 1) Inject the service
  private pricesService = inject(PricesService);

  // 2) Create an Observable for the HTTP call
  private prices$ = this.pricesService.getPrices();

  // 3) Convert Observable→Signal
  prices = toSignal(this.prices$, { initialValue: [] as Price[] });

  // 4) A loading signal
  isLoading = signal(true);

  constructor() {
    // 5) Subscribe inside the constructor to flip loading off
    this.prices$.subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false),
    });
  }
}