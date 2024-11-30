import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../transaction-finance-app-suffix.test-samples';

import { TransactionFinanceAppSuffixFormService } from './transaction-finance-app-suffix-form.service';

describe('TransactionFinanceAppSuffix Form Service', () => {
  let service: TransactionFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createTransactionFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createTransactionFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            transactionDate: expect.any(Object),
            amount: expect.any(Object),
            transactionType: expect.any(Object),
            description: expect.any(Object),
            account: expect.any(Object),
          }),
        );
      });

      it('passing ITransactionFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createTransactionFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            transactionDate: expect.any(Object),
            amount: expect.any(Object),
            transactionType: expect.any(Object),
            description: expect.any(Object),
            account: expect.any(Object),
          }),
        );
      });
    });

    describe('getTransactionFinanceAppSuffix', () => {
      it('should return NewTransactionFinanceAppSuffix for default TransactionFinanceAppSuffix initial value', () => {
        const formGroup = service.createTransactionFinanceAppSuffixFormGroup(sampleWithNewData);

        const transaction = service.getTransactionFinanceAppSuffix(formGroup) as any;

        expect(transaction).toMatchObject(sampleWithNewData);
      });

      it('should return NewTransactionFinanceAppSuffix for empty TransactionFinanceAppSuffix initial value', () => {
        const formGroup = service.createTransactionFinanceAppSuffixFormGroup();

        const transaction = service.getTransactionFinanceAppSuffix(formGroup) as any;

        expect(transaction).toMatchObject({});
      });

      it('should return ITransactionFinanceAppSuffix', () => {
        const formGroup = service.createTransactionFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const transaction = service.getTransactionFinanceAppSuffix(formGroup) as any;

        expect(transaction).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ITransactionFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createTransactionFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewTransactionFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createTransactionFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
