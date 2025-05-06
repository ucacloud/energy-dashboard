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
export class PricesComponent {
  // Inject the service using standalone-friendly inject()
  private pricesService = inject(PricesService);

  // Observable for the HTTP call
  private prices$ = this.pricesService.getPrices();

  // Convert Observable → Signal for template binding
  pricesSignal = toSignal(this.prices$, { initialValue: [] as Price[] });

  // Derived signal that always returns a Price[] (never undefined)
  viewPrices: Signal<Price[]> = computed<Price[]>(() => this.pricesSignal());

  // Loading state signal
  isLoading = signal(true);

  constructor() {
    // Subscribe to toggle loading flag when data arrives or errors
    this.prices$.subscribe({
      next: () => this.isLoading.set(false),
      error: () => this.isLoading.set(false),
    });
  }
}
