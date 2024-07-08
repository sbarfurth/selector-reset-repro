import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { initialState, selectCount } from './counter.reducer';
import { StoreModule } from '@ngrx/store';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideMockStore({
          initialState: {
            count: initialState,
          },
        }),
      ],
    }).compileComponents();
  });

  it(`should have the initial count`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement;
    const count = app.query(By.css('#count'));

    expect(count.nativeElement.textContent).toBe(initialState.toString());
  });

  it(`should have the overridden count`, () => {
    const mockStore = TestBed.inject(MockStore);
    mockStore.overrideSelector(selectCount, 10);

    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement;
    const count = app.query(By.css('#count'));

    expect(count.nativeElement.textContent).toBe('10');
  });

  // This test is exactly the same as the first one but comes AFTER the selector is overridden.
  it(`should not leak the overridden count over the initial count`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.debugElement;
    const count = app.query(By.css('#count'));

    expect(count.nativeElement.textContent).toBe(initialState.toString());
  });
});
