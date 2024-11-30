import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { DepartmentFinanceAppSuffixDetailComponent } from './department-finance-app-suffix-detail.component';

describe('DepartmentFinanceAppSuffix Management Detail Component', () => {
  let comp: DepartmentFinanceAppSuffixDetailComponent;
  let fixture: ComponentFixture<DepartmentFinanceAppSuffixDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartmentFinanceAppSuffixDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () =>
                import('./department-finance-app-suffix-detail.component').then(m => m.DepartmentFinanceAppSuffixDetailComponent),
              resolve: { department: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(DepartmentFinanceAppSuffixDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DepartmentFinanceAppSuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load department on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', DepartmentFinanceAppSuffixDetailComponent);

      // THEN
      expect(instance.department()).toEqual(expect.objectContaining({ id: 123 }));
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
