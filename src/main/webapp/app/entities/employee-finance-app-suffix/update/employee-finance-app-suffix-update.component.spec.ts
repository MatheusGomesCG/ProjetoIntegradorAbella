import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IDepartmentFinanceAppSuffix } from 'app/entities/department-finance-app-suffix/department-finance-app-suffix.model';
import { DepartmentFinanceAppSuffixService } from 'app/entities/department-finance-app-suffix/service/department-finance-app-suffix.service';
import { EmployeeFinanceAppSuffixService } from '../service/employee-finance-app-suffix.service';
import { IEmployeeFinanceAppSuffix } from '../employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixFormService } from './employee-finance-app-suffix-form.service';

import { EmployeeFinanceAppSuffixUpdateComponent } from './employee-finance-app-suffix-update.component';

describe('EmployeeFinanceAppSuffix Management Update Component', () => {
  let comp: EmployeeFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<EmployeeFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let employeeFormService: EmployeeFinanceAppSuffixFormService;
  let employeeService: EmployeeFinanceAppSuffixService;
  let departmentService: DepartmentFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EmployeeFinanceAppSuffixUpdateComponent],
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
      .overrideTemplate(EmployeeFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(EmployeeFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    employeeFormService = TestBed.inject(EmployeeFinanceAppSuffixFormService);
    employeeService = TestBed.inject(EmployeeFinanceAppSuffixService);
    departmentService = TestBed.inject(DepartmentFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call EmployeeFinanceAppSuffix query and add missing value', () => {
      const employee: IEmployeeFinanceAppSuffix = { id: 456 };
      const manager: IEmployeeFinanceAppSuffix = { id: 15087 };
      employee.manager = manager;

      const employeeCollection: IEmployeeFinanceAppSuffix[] = [{ id: 23251 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployeeFinanceAppSuffixes = [manager];
      const expectedCollection: IEmployeeFinanceAppSuffix[] = [...additionalEmployeeFinanceAppSuffixes, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployeeFinanceAppSuffixes.map(expect.objectContaining),
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call DepartmentFinanceAppSuffix query and add missing value', () => {
      const employee: IEmployeeFinanceAppSuffix = { id: 456 };
      const department: IDepartmentFinanceAppSuffix = { id: 28613 };
      employee.department = department;

      const departmentCollection: IDepartmentFinanceAppSuffix[] = [{ id: 412 }];
      jest.spyOn(departmentService, 'query').mockReturnValue(of(new HttpResponse({ body: departmentCollection })));
      const additionalDepartmentFinanceAppSuffixes = [department];
      const expectedCollection: IDepartmentFinanceAppSuffix[] = [...additionalDepartmentFinanceAppSuffixes, ...departmentCollection];
      jest.spyOn(departmentService, 'addDepartmentFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(departmentService.query).toHaveBeenCalled();
      expect(departmentService.addDepartmentFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        departmentCollection,
        ...additionalDepartmentFinanceAppSuffixes.map(expect.objectContaining),
      );
      expect(comp.departmentsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const employee: IEmployeeFinanceAppSuffix = { id: 456 };
      const manager: IEmployeeFinanceAppSuffix = { id: 20938 };
      employee.manager = manager;
      const department: IDepartmentFinanceAppSuffix = { id: 1595 };
      employee.department = department;

      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      expect(comp.employeesSharedCollection).toContain(manager);
      expect(comp.departmentsSharedCollection).toContain(department);
      expect(comp.employee).toEqual(employee);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeeFinanceAppSuffix>>();
      const employee = { id: 123 };
      jest.spyOn(employeeFormService, 'getEmployeeFinanceAppSuffix').mockReturnValue(employee);
      jest.spyOn(employeeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employee }));
      saveSubject.complete();

      // THEN
      expect(employeeFormService.getEmployeeFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(employeeService.update).toHaveBeenCalledWith(expect.objectContaining(employee));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeeFinanceAppSuffix>>();
      const employee = { id: 123 };
      jest.spyOn(employeeFormService, 'getEmployeeFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(employeeService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employee: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: employee }));
      saveSubject.complete();

      // THEN
      expect(employeeFormService.getEmployeeFinanceAppSuffix).toHaveBeenCalled();
      expect(employeeService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IEmployeeFinanceAppSuffix>>();
      const employee = { id: 123 };
      jest.spyOn(employeeService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ employee });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(employeeService.update).toHaveBeenCalled();
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

    describe('compareDepartmentFinanceAppSuffix', () => {
      it('Should forward to departmentService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(departmentService, 'compareDepartmentFinanceAppSuffix');
        comp.compareDepartmentFinanceAppSuffix(entity, entity2);
        expect(departmentService.compareDepartmentFinanceAppSuffix).toHaveBeenCalledWith(entity, entity2);
      });
    });
  });
});
