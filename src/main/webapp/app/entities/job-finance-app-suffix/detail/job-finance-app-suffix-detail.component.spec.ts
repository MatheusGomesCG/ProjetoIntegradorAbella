import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { of } from 'rxjs';

import { JobFinanceAppSuffixDetailComponent } from './job-finance-app-suffix-detail.component';

describe('JobFinanceAppSuffix Management Detail Component', () => {
  let comp: JobFinanceAppSuffixDetailComponent;
  let fixture: ComponentFixture<JobFinanceAppSuffixDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobFinanceAppSuffixDetailComponent],
      providers: [
        provideRouter(
          [
            {
              path: '**',
              loadComponent: () => import('./job-finance-app-suffix-detail.component').then(m => m.JobFinanceAppSuffixDetailComponent),
              resolve: { job: () => of({ id: 123 }) },
            },
          ],
          withComponentInputBinding(),
        ),
      ],
    })
      .overrideTemplate(JobFinanceAppSuffixDetailComponent, '')
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobFinanceAppSuffixDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load job on init', async () => {
      const harness = await RouterTestingHarness.create();
      const instance = await harness.navigateByUrl('/', JobFinanceAppSuffixDetailComponent);

      // THEN
      expect(instance.job()).toEqual(expect.objectContaining({ id: 123 }));
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
