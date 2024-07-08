import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectCount } from './counter.reducer';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly store = inject(Store);

  readonly count = this.store.selectSignal(selectCount);
}
