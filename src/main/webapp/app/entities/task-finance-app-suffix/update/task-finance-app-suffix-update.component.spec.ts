import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse, provideHttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject, from, of } from 'rxjs';

import { IJobFinanceAppSuffix } from 'app/entities/job-finance-app-suffix/job-finance-app-suffix.model';
import { JobFinanceAppSuffixService } from 'app/entities/job-finance-app-suffix/service/job-finance-app-suffix.service';
import { TaskFinanceAppSuffixService } from '../service/task-finance-app-suffix.service';
import { ITaskFinanceAppSuffix } from '../task-finance-app-suffix.model';
import { TaskFinanceAppSuffixFormService } from './task-finance-app-suffix-form.service';

import { TaskFinanceAppSuffixUpdateComponent } from './task-finance-app-suffix-update.component';

describe('TaskFinanceAppSuffix Management Update Component', () => {
  let comp: TaskFinanceAppSuffixUpdateComponent;
  let fixture: ComponentFixture<TaskFinanceAppSuffixUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let taskFormService: TaskFinanceAppSuffixFormService;
  let taskService: TaskFinanceAppSuffixService;
  let jobService: JobFinanceAppSuffixService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TaskFinanceAppSuffixUpdateComponent],
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
      .overrideTemplate(TaskFinanceAppSuffixUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(TaskFinanceAppSuffixUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    taskFormService = TestBed.inject(TaskFinanceAppSuffixFormService);
    taskService = TestBed.inject(TaskFinanceAppSuffixService);
    jobService = TestBed.inject(JobFinanceAppSuffixService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call JobFinanceAppSuffix query and add missing value', () => {
      const task: ITaskFinanceAppSuffix = { id: 456 };
      const jobs: IJobFinanceAppSuffix[] = [{ id: 16443 }];
      task.jobs = jobs;

      const jobCollection: IJobFinanceAppSuffix[] = [{ id: 14332 }];
      jest.spyOn(jobService, 'query').mockReturnValue(of(new HttpResponse({ body: jobCollection })));
      const additionalJobFinanceAppSuffixes = [...jobs];
      const expectedCollection: IJobFinanceAppSuffix[] = [...additionalJobFinanceAppSuffixes, ...jobCollection];
      jest.spyOn(jobService, 'addJobFinanceAppSuffixToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ task });
      comp.ngOnInit();

      expect(jobService.query).toHaveBeenCalled();
      expect(jobService.addJobFinanceAppSuffixToCollectionIfMissing).toHaveBeenCalledWith(
        jobCollection,
        ...additionalJobFinanceAppSuffixes.map(expect.objectContaining),
      );
      expect(comp.jobsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const task: ITaskFinanceAppSuffix = { id: 456 };
      const job: IJobFinanceAppSuffix = { id: 20898 };
      task.jobs = [job];

      activatedRoute.data = of({ task });
      comp.ngOnInit();

      expect(comp.jobsSharedCollection).toContain(job);
      expect(comp.task).toEqual(task);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskFinanceAppSuffix>>();
      const task = { id: 123 };
      jest.spyOn(taskFormService, 'getTaskFinanceAppSuffix').mockReturnValue(task);
      jest.spyOn(taskService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task }));
      saveSubject.complete();

      // THEN
      expect(taskFormService.getTaskFinanceAppSuffix).toHaveBeenCalled();
      expect(comp.previousState).toHaveBeenCalled();
      expect(taskService.update).toHaveBeenCalledWith(expect.objectContaining(task));
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskFinanceAppSuffix>>();
      const task = { id: 123 };
      jest.spyOn(taskFormService, 'getTaskFinanceAppSuffix').mockReturnValue({ id: null });
      jest.spyOn(taskService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task: null });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: task }));
      saveSubject.complete();

      // THEN
      expect(taskFormService.getTaskFinanceAppSuffix).toHaveBeenCalled();
      expect(taskService.create).toHaveBeenCalled();
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<ITaskFinanceAppSuffix>>();
      const task = { id: 123 };
      jest.spyOn(taskService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ task });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(taskService.update).toHaveBeenCalled();
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
  });
});
