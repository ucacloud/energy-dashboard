import { Component, inject, signal, computed, Signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { Price, PricesService } from '../services/prices.service';

@Component({
  selector: 'app-prices',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './prices.component.html',
  styleUrls: ['./prices.component.css'],
})

// uses signals
export class PricesComponent {
  private pricesService = inject(PricesService);

  private prices$ = this.pricesService.getPrices();

  pricesSignal = toSignal(this.prices$, { initialValue: [] as Price[] });

  viewPrices: Signal<Price[]> = computed<Price[]>(() => this.pricesSignal());

  isLoading = signal(true);

  constructor() {
    this.prices$.subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false),
    });
  }
}
