import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IAccountUserFinanceAppSuffix } from 'app/entities/account-user-finance-app-suffix/account-user-finance-app-suffix.model';
import { AccountUserFinanceAppSuffixService } from 'app/entities/account-user-finance-app-suffix/service/account-user-finance-app-suffix.service';
import { InvestmentFinanceAppSuffixService } from '../service/investment-finance-app-suffix.service';
import { IInvestmentFinanceAppSuffix } from '../investment-finance-app-suffix.model';
import { InvestmentFinanceAppSuffixFormService } from './investment-finance-app-suffix-form.service';

import { InvestmentFinanceAppSuffixUpdateComponent } from './investment-finance-app-suffix-update.component';

describe('InvestmentFinanceAppSuffix Management Update Component', () => {
  let comp: InvestmentFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<InvestmentFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let investmentFormService: InvestmentFinanceAppSuffixFormService;
  let investmentService: InvestmentFinanceAppSuffixService;
  let accountUserService: AccountUserFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [InvestmentFinanceAppSuffixUpdateComponent],
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
      .overrideTemplate(InvestmentFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(InvestmentFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    investmentFormService = TestBed.inject(InvestmentFinanceAppSuffixFormService);
    investmentService = TestBed.inject(InvestmentFinanceAppSuffixService);
    accountUserService = TestBed.inject(AccountUserFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call AccountUserFinanceAppSuffix query and add missing value', () => {
      const investment: IInvestmentFinanceAppSuffix = { id: 456 };
      const account: IAccountUserFinanceAppSuffix = { id: 29571 };
      investment.account = account;

      const accountUserCollection: IAccountUserFinanceAppSuffix[] = [{ id: 22263 }];
      jest.spyOn(accountUserService, 'query').mockReturnValue(of(new HttpResponse({ body: accountUserCollection })));
      const additionalAccountUserFinanceAppSuffixes = [account];
      const expectedCollection: IAccountUserFinanceAppSuffix[] = [...additionalAccountUserFinanceAppSuffixes, ...accountUserCollection];
      jest.spyOn(accountUserService, 'addAccountUserFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ investment });
      comp.ngOnInit();

      expect(accountUserService.query).toHaveBeenCalled();
      expect(accountUserService.addAccountUserFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        accountUserCollection,
        ...additionalAccountUserFinanceAppSuffixes.map(expect.objectContaining),
      );
      expect(comp.accountUsersSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const investment: IInvestmentFinanceAppSuffix = { id: 456 };
      const account: IAccountUserFinanceAppSuffix = { id: 27255 };
      investment.account = account;

      activatedRoute.data = of({ investment });
      comp.ngOnInit();

      expect(comp.accountUsersSharedCollection).toContain(account);
      expect(comp.investment).toEqual(investment);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvestmentFinanceAppSuffix>>();
      const investment = { id: 123 };
      jest.spyOn(investmentFormService, 'getInvestmentFinanceAppSuffix').mockReturnValue(investment);
      jest.spyOn(investmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ investment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: investment }));
      saveSubject.complete();

      // THEN
      expect(investmentFormService.getInvestmentFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(investmentService.update).toHaveBeenCalledWith(expect.objectContaining(investment));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvestmentFinanceAppSuffix>>();
      const investment = { id: 123 };
      jest.spyOn(investmentFormService, 'getInvestmentFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(investmentService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ investment: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: investment }));
      saveSubject.complete();

      // THEN
      expect(investmentFormService.getInvestmentFinanceAppSuffix).toHaveBeenCalled();
      expect(investmentService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IInvestmentFinanceAppSuffix>>();
      const investment = { id: 123 };
      jest.spyOn(investmentService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ investment });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(investmentService.update).toHaveBeenCalled();
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
