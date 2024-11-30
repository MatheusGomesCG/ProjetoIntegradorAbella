jest.mock('@ng-bootstrap/ng-bootstrap');

import { ComponentFixture, TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { AccountUserFinanceAppSuffixService } from '../service/account-user-finance-app-suffix.service';

import { AccountUserFinanceAppSuffixDeleteDialogComponent } from './account-user-finance-app-suffix-delete-dialog.component';

describe('AccountUserFinanceAppSuffix Management Delete Component', () => {
  let comp: AccountUserFinanceAppSuffixDeleteDialogComponent;
  let fixture: ComponentFixture<AccountUserFinanceAppSuffixDeleteDialogComponent>;
  let service: AccountUserFinanceAppSuffixService;
  let mockActiveModal: NgbActiveModal;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccountUserFinanceAppSuffixDeleteDialogComponent],
      providers: [provideHttpClient(), NgbActiveModal],
    })
      .overrideTemplate(AccountUserFinanceAppSuffixDeleteDialogComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(AccountUserFinanceAppSuffixDeleteDialogComponent);
    comp = fixture.componentInstance;
    service = TestBed.inject(AccountUserFinanceAppSuffixService);
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
