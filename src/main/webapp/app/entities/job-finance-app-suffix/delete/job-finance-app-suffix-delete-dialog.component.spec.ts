jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { JobFinanceAppSuffixService } from '../service/job-finance-app-suffix.service';

import { JobFinanceAppSuffixDeleteDialogComponent } from './job-finance-app-suffix-delete-dialog.component';

describe('JobFinanceAppSuffix Management Delete Component', () => {
  let comp: JobFinanceAppSuffixDeleteDialogComponent;
  let fixture: ComponentFixture<JobFinanceAppSuffixDeleteDialogComponent>;
  let service: JobFinanceAppSuffixService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JobFinanceAppSuffixDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(JobFinanceAppSuffixDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(JobFinanceAppSuffixDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(JobFinanceAppSuffixService);
    mockActiveModal = TestBed.inject(NgbActiveModal);
  });

  describe('confirmDelete', () => {
    it('Should call delete service on confirmDelete', inject(
      [],
      fakeAsync(() => {
        // GIVEN
        jest.spyOn(service, 'delete').mockReturnValue(of(new HttpResponse({ body: {} })));

        // WHEN
        comp.confirmDelete(123);
        tick();

        // THEN
        expect(service.delete).toHaveBeenCalledWith(123);
        expect(mockActiveModal.close).toHaveBeenCalledWith('deleted');
      }),
    ));

    it('Should not call delete service on clear', () => {
      // GIVEN
      jest.spyOn(service, 'delete');

      // WHEN
      comp.cancel();

      // THEN
      expect(service.delete).not.toHaveBeenCalled();
      expect(mockActiveModal.close).not.toHaveBeenCalled();
      expect(mockActiveModal.dismiss).toHaveBeenCalled();
    });
  });
});
