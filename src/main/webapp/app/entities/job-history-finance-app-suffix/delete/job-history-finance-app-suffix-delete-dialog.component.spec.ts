jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { JobHistoryFinanceAppSuffixService } from '../service/job-history-finance-app-suffix.service';

import { JobHistoryFinanceAppSuffixDeleteDialogComponent } from './job-history-finance-app-suffix-delete-dialog.component';

describe('JobHistoryFinanceAppSuffix Management Delete Component', () => {
  let comp: JobHistoryFinanceAppSuffixDeleteDialogComponent;
  let fixture: ComponentFixture<JobHistoryFinanceAppSuffixDeleteDialogComponent>;
  let service: JobHistoryFinanceAppSuffixService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JobHistoryFinanceAppSuffixDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(JobHistoryFinanceAppSuffixDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(JobHistoryFinanceAppSuffixDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(JobHistoryFinanceAppSuffixService);
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
