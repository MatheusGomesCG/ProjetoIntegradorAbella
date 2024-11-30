import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IEmployeeFinanceAppSuffix } from 'app/entities/employee-finance-app-suffix/employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixService } from 'app/entities/employee-finance-app-suffix/service/employee-finance-app-suffix.service';
import { AccountUserFinanceAppSuffixService } from '../service/account-user-finance-app-suffix.service';
import { IAccountUserFinanceAppSuffix } from '../account-user-finance-app-suffix.model';
import { AccountUserFinanceAppSuffixFormService } from './account-user-finance-app-suffix-form.service';

import { AccountUserFinanceAppSuffixUpdateComponent } from './account-user-finance-app-suffix-update.component';

describe('AccountUserFinanceAppSuffix Management Update Component', () => {
  let comp: AccountUserFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<AccountUserFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let accountUserFormService: AccountUserFinanceAppSuffixFormService;
  let accountUserService: AccountUserFinanceAppSuffixService;
  let employeeService: EmployeeFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AccountUserFinanceAppSuffixUpdateComponent],
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
      .overrideTemplate(AccountUserFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(AccountUserFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    accountUserFormService = TestBed.inject(AccountUserFinanceAppSuffixFormService);
    accountUserService = TestBed.inject(AccountUserFinanceAppSuffixService);
    employeeService = TestBed.inject(EmployeeFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EmployeeFinanceAppSuffix query and add missing value', () => {
      const accountUser: IAccountUserFinanceAppSuffix = { id: 456 };
      const owner: IEmployeeFinanceAppSuffix = { id: 1446 };
      accountUser.owner = owner;

      const employeeCollection: IEmployeeFinanceAppSuffix[] = [{ id: 16275 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployeeFinanceAppSuffixes = [owner];
      const expectedCollection: IEmployeeFinanceAppSuffix[] = [...additionalEmployeeFinanceAppSuffixes, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ accountUser });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployeeFinanceAppSuffixes.map(expect.objectContaining),
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const accountUser: IAccountUserFinanceAppSuffix = { id: 456 };
      const owner: IEmployeeFinanceAppSuffix = { id: 10247 };
      accountUser.owner = owner;

      activatedRoute.data = of({ accountUser });
      comp.ngOnInit();

      expect(comp.employeesSharedCollection).toContain(owner);
      expect(comp.accountUser).toEqual(accountUser);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountUserFinanceAppSuffix>>();
      const accountUser = { id: 123 };
      jest.spyOn(accountUserFormService, 'getAccountUserFinanceAppSuffix').mockReturnValue(accountUser);
      jest.spyOn(accountUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountUser }));
      saveSubject.complete();

      // THEN
      expect(accountUserFormService.getAccountUserFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(accountUserService.update).toHaveBeenCalledWith(expect.objectContaining(accountUser));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountUserFinanceAppSuffix>>();
      const accountUser = { id: 123 };
      jest.spyOn(accountUserFormService, 'getAccountUserFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(accountUserService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountUser: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: accountUser }));
      saveSubject.complete();

      // THEN
      expect(accountUserFormService.getAccountUserFinanceAppSuffix).toHaveBeenCalled();
      expect(accountUserService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IAccountUserFinanceAppSuffix>>();
      const accountUser = { id: 123 };
      jest.spyOn(accountUserService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ accountUser });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(accountUserService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareEmployeeFinanceAppSuffix', () => {
      it('Should forward to employeeService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(employeeService, 'compareEmployeeFinanceAppSuffix');
        comp.compareEmployeeFinanceAppSuffix(entity, entity2);
        expect(employeeService.compareEmployeeFinanceAppSuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
