import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SettlementListComponent } from './settlements/settlement-list/settlement-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SettlementListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // note the 's' in styleUrls
})
export class AppComponent {
  title = 'energy-dashboard';
}