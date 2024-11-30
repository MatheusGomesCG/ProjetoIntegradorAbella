import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IJobFinanceAppSuffix } from 'app/entities/job-finance-app-suffix/job-finance-app-suffix.model';
import { JobFinanceAppSuffixService } from 'app/entities/job-finance-app-suffix/service/job-finance-app-suffix.service';
import { IDepartmentFinanceAppSuffix } from 'app/entities/department-finance-app-suffix/department-finance-app-suffix.model';
import { DepartmentFinanceAppSuffixService } from 'app/entities/department-finance-app-suffix/service/department-finance-app-suffix.service';
import { IEmployeeFinanceAppSuffix } from 'app/entities/employee-finance-app-suffix/employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixService } from 'app/entities/employee-finance-app-suffix/service/employee-finance-app-suffix.service';
import { IJobHistoryFinanceAppSuffix } from '../job-history-finance-app-suffix.model';
import { JobHistoryFinanceAppSuffixService } from '../service/job-history-finance-app-suffix.service';
import { JobHistoryFinanceAppSuffixFormService } from './job-history-finance-app-suffix-form.service';

import { JobHistoryFinanceAppSuffixUpdateComponent } from './job-history-finance-app-suffix-update.component';

describe('JobHistoryFinanceAppSuffix Management Update Component', () => {
  let comp: JobHistoryFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<JobHistoryFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobHistoryFormService: JobHistoryFinanceAppSuffixFormService;
  let jobHistoryService: JobHistoryFinanceAppSuffixService;
  let jobService: JobFinanceAppSuffixService;
  let departmentService: DepartmentFinanceAppSuffixService;
  let employeeService: EmployeeFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JobHistoryFinanceAppSuffixUpdateComponent],
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
      .overrideTemplate(JobHistoryFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobHistoryFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobHistoryFormService = TestBed.inject(JobHistoryFinanceAppSuffixFormService);
    jobHistoryService = TestBed.inject(JobHistoryFinanceAppSuffixService);
    jobService = TestBed.inject(JobFinanceAppSuffixService);
    departmentService = TestBed.inject(DepartmentFinanceAppSuffixService);
    employeeService = TestBed.inject(EmployeeFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call job query and add missing value', () => {
      const jobHistory: IJobHistoryFinanceAppSuffix = { id: 456 };
      const job: IJobFinanceAppSuffix = { id: 4434 };
      jobHistory.job = job;

      const jobCollection: IJobFinanceAppSuffix[] = [{ id: 11569 }];
      jest.spyOn(jobService, 'query').mockReturnValue(of(new HttpResponse({ body: jobCollection })));
      const expectedCollection: IJobFinanceAppSuffix[] = [job, ...jobCollection];
      jest.spyOn(jobService, 'addJobFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      expect(jobService.query).toHaveBeenCalled();
      expect(jobService.addJobFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(jobCollection, job);
      expect(comp.jobsCollection).toEqual(expectedCollection);
    });

    it('Should call department query and add missing value', () => {
      const jobHistory: IJobHistoryFinanceAppSuffix = { id: 456 };
      const department: IDepartmentFinanceAppSuffix = { id: 8013 };
      jobHistory.department = department;

      const departmentCollection: IDepartmentFinanceAppSuffix[] = [{ id: 4388 }];
      jest.spyOn(departmentService, 'query').mockReturnValue(of(new HttpResponse({ body: departmentCollection })));
      const expectedCollection: IDepartmentFinanceAppSuffix[] = [department, ...departmentCollection];
      jest.spyOn(departmentService, 'addDepartmentFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      expect(departmentService.query).toHaveBeenCalled();
      expect(departmentService.addDepartmentFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(departmentCollection, department);
      expect(comp.departmentsCollection).toEqual(expectedCollection);
    });

    it('Should call employee query and add missing value', () => {
      const jobHistory: IJobHistoryFinanceAppSuffix = { id: 456 };
      const employee: IEmployeeFinanceAppSuffix = { id: 21508 };
      jobHistory.employee = employee;

      const employeeCollection: IEmployeeFinanceAppSuffix[] = [{ id: 5441 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const expectedCollection: IEmployeeFinanceAppSuffix[] = [employee, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(employeeCollection, employee);
      expect(comp.employeesCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const jobHistory: IJobHistoryFinanceAppSuffix = { id: 456 };
      const job: IJobFinanceAppSuffix = { id: 28532 };
      jobHistory.job = job;
      const department: IDepartmentFinanceAppSuffix = { id: 23110 };
      jobHistory.department = department;
      const employee: IEmployeeFinanceAppSuffix = { id: 1019 };
      jobHistory.employee = employee;

      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      expect(comp.jobsCollection).toContain(job);
      expect(comp.departmentsCollection).toContain(department);
      expect(comp.employeesCollection).toContain(employee);
      expect(comp.jobHistory).toEqual(jobHistory);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobHistoryFinanceAppSuffix>>();
      const jobHistory = { id: 123 };
      jest.spyOn(jobHistoryFormService, 'getJobHistoryFinanceAppSuffix').mockReturnValue(jobHistory);
      jest.spyOn(jobHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobHistory }));
      saveSubject.complete();

      // THEN
      expect(jobHistoryFormService.getJobHistoryFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobHistoryService.update).toHaveBeenCalledWith(expect.objectContaining(jobHistory));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobHistoryFinanceAppSuffix>>();
      const jobHistory = { id: 123 };
      jest.spyOn(jobHistoryFormService, 'getJobHistoryFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(jobHistoryService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobHistory: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: jobHistory }));
      saveSubject.complete();

      // THEN
      expect(jobHistoryFormService.getJobHistoryFinanceAppSuffix).toHaveBeenCalled();
      expect(jobHistoryService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobHistoryFinanceAppSuffix>>();
      const jobHistory = { id: 123 };
      jest.spyOn(jobHistoryService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ jobHistory });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobHistoryService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareJobFinanceAppSuffix', () => {
      it('Should forward to jobService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(jobService, 'compareJobFinanceAppSuffix');
        comp.compareJobFinanceAppSuffix(entity, entity2);
        expect(jobService.compareJobFinanceAppSuffix).toHaveBeenCalledWith(entity, entity2);
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
