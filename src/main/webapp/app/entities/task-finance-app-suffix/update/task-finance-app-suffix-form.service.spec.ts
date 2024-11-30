import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../task-finance-app-suffix.test-samples';

import { TaskFinanceAppSuffixFormService } from './task-finance-app-suffix-form.service';

describe('TaskFinanceAppSuffix Form Service', () => {
  let service: TaskFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TaskFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createTaskFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTaskFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            jobs: expect.any(Object),
          }),
        );
      });

      it('passing ITaskFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createTaskFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            title: expect.any(Object),
            description: expect.any(Object),
            jobs: expect.any(Object),
          }),
        );
      });
    });

    describe('getTaskFinanceAppSuffix', () => {
      it('should return NewTaskFinanceAppSuffix for default TaskFinanceAppSuffix initial value', () => {
        const formGroup = service.createTaskFinanceAppSuffixFormGroup(sampleWithNewData);

        const task = service.getTaskFinanceAppSuffix(formGroup) as any;

        expect(task).toMatchObject(sampleWithNewData);
      });

      it('should return NewTaskFinanceAppSuffix for empty TaskFinanceAppSuffix initial value', () => {
        const formGroup = service.createTaskFinanceAppSuffixFormGroup();

        const task = service.getTaskFinanceAppSuffix(formGroup) as any;

        expect(task).toMatchObject({});
      });

      it('should return ITaskFinanceAppSuffix', () => {
        const formGroup = service.createTaskFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const task = service.getTaskFinanceAppSuffix(formGroup) as any;

        expect(task).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITaskFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createTaskFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTaskFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createTaskFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
