import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAccountUserFinanceAppSuffix } from 'app/entities/account-user-finance-app-suffix/account-user-finance-app-suffix.model';
import { AccountUserFinanceAppSuffixService } from 'app/entities/account-user-finance-app-suffix/service/account-user-finance-app-suffix.service';
import { TransactionFinanceAppSuffixService } from '../service/transaction-finance-app-suffix.service';
import { ITransactionFinanceAppSuffix } from '../transaction-finance-app-suffix.model';
import { TransactionFinanceAppSuffixFormService } from './transaction-finance-app-suffix-form.service';

import { TransactionFinanceAppSuffixUpdateComponent } from './transaction-finance-app-suffix-update.component';

describe('TransactionFinanceAppSuffix Management Update Component', () => {
  let comp: TransactionFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<TransactionFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let transactionFormService: TransactionFinanceAppSuffixFormService;
  let transactionService: TransactionFinanceAppSuffixService;
  let accountUserService: AccountUserFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TransactionFinanceAppSuffixUpdateComponent],
      providers: [
        provideHttpClient(),
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(TransactionFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TransactionFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    transactionFormService = TestBed.inject(TransactionFinanceAppSuffixFormService);
    transactionService = TestBed.inject(TransactionFinanceAppSuffixService);
    accountUserService = TestBed.inject(AccountUserFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AccountUserFinanceAppSuffix query and add missing value', () => {
      const transaction: ITransactionFinanceAppSuffix = { id: 456 };
      const account: IAccountUserFinanceAppSuffix = { id: 15931 };
      transaction.account = account;

      const accountUserCollection: IAccountUserFinanceAppSuffix[] = [{ id: 30411 }];
      jest.spyOn(accountUserService, 'query').mockReturnValue(of(new HttpResponse({ body: accountUserCollection })));
      const additionalAccountUserFinanceAppSuffixes = [account];
      const expectedCollection: IAccountUserFinanceAppSuffix[] = [...additionalAccountUserFinanceAppSuffixes, ...accountUserCollection];
      jest.spyOn(accountUserService, 'addAccountUserFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ transaction });
      comp.ngOnInit();

      expect(accountUserService.query).toHaveBeenCalled();
      expect(accountUserService.addAccountUserFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        accountUserCollection,
        ...additionalAccountUserFinanceAppSuffixes.map(expect.objectContaining),
      );
      expect(comp.accountUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const transaction: ITransactionFinanceAppSuffix = { id: 456 };
      const account: IAccountUserFinanceAppSuffix = { id: 15528 };
      transaction.account = account;

      activatedRoute.data = of({ transaction });
      comp.ngOnInit();

      expect(comp.accountUsersSharedCollection).toContain(account);
      expect(comp.transaction).toEqual(transaction);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionFinanceAppSuffix>>();
      const transaction = { id: 123 };
      jest.spyOn(transactionFormService, 'getTransactionFinanceAppSuffix').mockReturnValue(transaction);
      jest.spyOn(transactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transaction }));
      saveSubject.complete();

      // THEN
      expect(transactionFormService.getTransactionFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(transactionService.update).toHaveBeenCalledWith(expect.objectContaining(transaction));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionFinanceAppSuffix>>();
      const transaction = { id: 123 };
      jest.spyOn(transactionFormService, 'getTransactionFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(transactionService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transaction: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: transaction }));
      saveSubject.complete();

      // THEN
      expect(transactionFormService.getTransactionFinanceAppSuffix).toHaveBeenCalled();
      expect(transactionService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITransactionFinanceAppSuffix>>();
      const transaction = { id: 123 };
      jest.spyOn(transactionService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ transaction });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(transactionService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareAccountUserFinanceAppSuffix', () => {
      it('Should forward to accountUserService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(accountUserService, 'compareAccountUserFinanceAppSuffix');
        comp.compareAccountUserFinanceAppSuffix(entity, entity2);
        expect(accountUserService.compareAccountUserFinanceAppSuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
