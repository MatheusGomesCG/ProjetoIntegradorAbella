import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { ITaskFinanceAppSuffix } from 'app/entities/task-finance-app-suffix/task-finance-app-suffix.model';
import { TaskFinanceAppSuffixService } from 'app/entities/task-finance-app-suffix/service/task-finance-app-suffix.service';
import { IEmployeeFinanceAppSuffix } from 'app/entities/employee-finance-app-suffix/employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixService } from 'app/entities/employee-finance-app-suffix/service/employee-finance-app-suffix.service';
import { IJobFinanceAppSuffix } from '../job-finance-app-suffix.model';
import { JobFinanceAppSuffixService } from '../service/job-finance-app-suffix.service';
import { JobFinanceAppSuffixFormService } from './job-finance-app-suffix-form.service';

import { JobFinanceAppSuffixUpdateComponent } from './job-finance-app-suffix-update.component';

describe('JobFinanceAppSuffix Management Update Component', () => {
  let comp: JobFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<JobFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let jobFormService: JobFinanceAppSuffixFormService;
  let jobService: JobFinanceAppSuffixService;
  let taskService: TaskFinanceAppSuffixService;
  let employeeService: EmployeeFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [JobFinanceAppSuffixUpdateComponent],
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
      .overrideTemplate(JobFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(JobFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    jobFormService = TestBed.inject(JobFinanceAppSuffixFormService);
    jobService = TestBed.inject(JobFinanceAppSuffixService);
    taskService = TestBed.inject(TaskFinanceAppSuffixService);
    employeeService = TestBed.inject(EmployeeFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call TaskFinanceAppSuffix query and add missing value', () => {
      const job: IJobFinanceAppSuffix = { id: 456 };
      const tasks: ITaskFinanceAppSuffix[] = [{ id: 109 }];
      job.tasks = tasks;

      const taskCollection: ITaskFinanceAppSuffix[] = [{ id: 19009 }];
      jest.spyOn(taskService, 'query').mockReturnValue(of(new HttpResponse({ body: taskCollection })));
      const additionalTaskFinanceAppSuffixes = [...tasks];
      const expectedCollection: ITaskFinanceAppSuffix[] = [...additionalTaskFinanceAppSuffixes, ...taskCollection];
      jest.spyOn(taskService, 'addTaskFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(taskService.query).toHaveBeenCalled();
      expect(taskService.addTaskFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        taskCollection,
        ...additionalTaskFinanceAppSuffixes.map(expect.objectContaining),
      );
      expect(comp.tasksSharedCollection).toEqual(expectedCollection);
    });

    it('Should call EmployeeFinanceAppSuffix query and add missing value', () => {
      const job: IJobFinanceAppSuffix = { id: 456 };
      const employee: IEmployeeFinanceAppSuffix = { id: 25744 };
      job.employee = employee;

      const employeeCollection: IEmployeeFinanceAppSuffix[] = [{ id: 30214 }];
      jest.spyOn(employeeService, 'query').mockReturnValue(of(new HttpResponse({ body: employeeCollection })));
      const additionalEmployeeFinanceAppSuffixes = [employee];
      const expectedCollection: IEmployeeFinanceAppSuffix[] = [...additionalEmployeeFinanceAppSuffixes, ...employeeCollection];
      jest.spyOn(employeeService, 'addEmployeeFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(employeeService.query).toHaveBeenCalled();
      expect(employeeService.addEmployeeFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        employeeCollection,
        ...additionalEmployeeFinanceAppSuffixes.map(expect.objectContaining),
      );
      expect(comp.employeesSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const job: IJobFinanceAppSuffix = { id: 456 };
      const task: ITaskFinanceAppSuffix = { id: 15618 };
      job.tasks = [task];
      const employee: IEmployeeFinanceAppSuffix = { id: 323 };
      job.employee = employee;

      activatedRoute.data = of({ job });
      comp.ngOnInit();

      expect(comp.tasksSharedCollection).toContain(task);
      expect(comp.employeesSharedCollection).toContain(employee);
      expect(comp.job).toEqual(job);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobFinanceAppSuffix>>();
      const job = { id: 123 };
      jest.spyOn(jobFormService, 'getJobFinanceAppSuffix').mockReturnValue(job);
      jest.spyOn(jobService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: job }));
      saveSubject.complete();

      // THEN
      expect(jobFormService.getJobFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(jobService.update).toHaveBeenCalledWith(expect.objectContaining(job));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobFinanceAppSuffix>>();
      const job = { id: 123 };
      jest.spyOn(jobFormService, 'getJobFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(jobService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: job }));
      saveSubject.complete();

      // THEN
      expect(jobFormService.getJobFinanceAppSuffix).toHaveBeenCalled();
      expect(jobService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<IJobFinanceAppSuffix>>();
      const job = { id: 123 };
      jest.spyOn(jobService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ job });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(jobService.update).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Compare relationships', () => {
    describe('compareTaskFinanceAppSuffix', () => {
      it('Should forward to taskService', () => {
        const entity = { id: 123 };
        const entity2 = { id: 456 };
        jest.spyOn(taskService, 'compareTaskFinanceAppSuffix');
        comp.compareTaskFinanceAppSuffix(entity, entity2);
        expect(taskService.compareTaskFinanceAppSuffix).toHaveBeenCalledWith(entity, entity2);
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
