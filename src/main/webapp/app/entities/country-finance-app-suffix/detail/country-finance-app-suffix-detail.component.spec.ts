import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { CountryFinanceAppSuffixDetailComponent } from './country-finance-app-suffix-detail.component';

describe('CountryFinanceAppSuffix Management Detail Component', () => {
  let comp: CountryFinanceAppSuffixDetailComponent;
  let fixture: ComponentFixture<CountryFinanceAppSuffixDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountryFinanceAppSuffixDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./country-finance-app-suffix-detail.component').then(m => m.CountryFinanceAppSuffixDetailComponent),
              resolve: { country: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(CountryFinanceAppSuffixDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryFinanceAppSuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load country on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', CountryFinanceAppSuffixDetailComponent);

      // THEN
      expect(instance.country()).toEqual(expect.objectContaining({ id: 123 }));
    });
  });

  describe('PreviousState', () => {
    it('Should navigate to previous state', () => {
      jest.spyOn(window.history, 'back');
      comp.previousState();
      expect(window.history.back).toHaveBeenCalled();
    });
  });
});
