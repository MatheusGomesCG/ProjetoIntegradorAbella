import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { RegionFinanceAppSuffixDetailComponent } from './region-finance-app-suffix-detail.component';

describe('RegionFinanceAppSuffix Management Detail Component', () => {
  let comp: RegionFinanceAppSuffixDetailComponent;
  let fixture: ComponentFixture<RegionFinanceAppSuffixDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegionFinanceAppSuffixDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./region-finance-app-suffix-detail.component').then(m => m.RegionFinanceAppSuffixDetailComponent),
              resolve: { region: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(RegionFinanceAppSuffixDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionFinanceAppSuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load region on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', RegionFinanceAppSuffixDetailComponent);

      // THEN
      expect(instance.region()).toEqual(expect.objectContaining({ id: 123 }));
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
