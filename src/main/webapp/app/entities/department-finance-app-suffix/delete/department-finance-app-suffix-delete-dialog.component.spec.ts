jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { DepartmentFinanceAppSuffixService } from '../service/department-finance-app-suffix.service';

import { DepartmentFinanceAppSuffixDeleteDialogComponent } from './department-finance-app-suffix-delete-dialog.component';

describe('DepartmentFinanceAppSuffix Management Delete Component', () => {
  let comp: DepartmentFinanceAppSuffixDeleteDialogComponent;
  let fixture: ComponentFixture<DepartmentFinanceAppSuffixDeleteDialogComponent>;
  let service: DepartmentFinanceAppSuffixService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DepartmentFinanceAppSuffixDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(DepartmentFinanceAppSuffixDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DepartmentFinanceAppSuffixDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(DepartmentFinanceAppSuffixService);
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
