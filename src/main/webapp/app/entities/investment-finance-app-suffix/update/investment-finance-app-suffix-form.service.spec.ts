import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../investment-finance-app-suffix.test-samples';

import { InvestmentFinanceAppSuffixFormService } from './investment-finance-app-suffix-form.service';

describe('InvestmentFinanceAppSuffix Form Service', () => {
  let service: InvestmentFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InvestmentFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createInvestmentFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createInvestmentFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            investmentName: expect.any(Object),
            investmentType: expect.any(Object),
            amount: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            account: expect.any(Object),
          }),
        );
      });

      it('passing IInvestmentFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createInvestmentFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            investmentName: expect.any(Object),
            investmentType: expect.any(Object),
            amount: expect.any(Object),
            startDate: expect.any(Object),
            endDate: expect.any(Object),
            account: expect.any(Object),
          }),
        );
      });
    });

    describe('getInvestmentFinanceAppSuffix', () => {
      it('should return NewInvestmentFinanceAppSuffix for default InvestmentFinanceAppSuffix initial value', () => {
        const formGroup = service.createInvestmentFinanceAppSuffixFormGroup(sampleWithNewData);

        const investment = service.getInvestmentFinanceAppSuffix(formGroup) as any;

        expect(investment).toMatchObject(sampleWithNewData);
      });

      it('should return NewInvestmentFinanceAppSuffix for empty InvestmentFinanceAppSuffix initial value', () => {
        const formGroup = service.createInvestmentFinanceAppSuffixFormGroup();

        const investment = service.getInvestmentFinanceAppSuffix(formGroup) as any;

        expect(investment).toMatchObject({});
      });

      it('should return IInvestmentFinanceAppSuffix', () => {
        const formGroup = service.createInvestmentFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const investment = service.getInvestmentFinanceAppSuffix(formGroup) as any;

        expect(investment).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IInvestmentFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createInvestmentFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewInvestmentFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createInvestmentFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
