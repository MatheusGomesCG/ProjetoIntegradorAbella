import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../account-user-finance-app-suffix.test-samples';

import { AccountUserFinanceAppSuffixFormService } from './account-user-finance-app-suffix-form.service';

describe('AccountUserFinanceAppSuffix Form Service', () => {
  let service: AccountUserFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AccountUserFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createAccountUserFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createAccountUserFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountNumber: expect.any(Object),
            accountType: expect.any(Object),
            balance: expect.any(Object),
            creationDate: expect.any(Object),
            status: expect.any(Object),
            owner: expect.any(Object),
          }),
        );
      });

      it('passing IAccountUserFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createAccountUserFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            accountNumber: expect.any(Object),
            accountType: expect.any(Object),
            balance: expect.any(Object),
            creationDate: expect.any(Object),
            status: expect.any(Object),
            owner: expect.any(Object),
          }),
        );
      });
    });

    describe('getAccountUserFinanceAppSuffix', () => {
      it('should return NewAccountUserFinanceAppSuffix for default AccountUserFinanceAppSuffix initial value', () => {
        const formGroup = service.createAccountUserFinanceAppSuffixFormGroup(sampleWithNewData);

        const accountUser = service.getAccountUserFinanceAppSuffix(formGroup) as any;

        expect(accountUser).toMatchObject(sampleWithNewData);
      });

      it('should return NewAccountUserFinanceAppSuffix for empty AccountUserFinanceAppSuffix initial value', () => {
        const formGroup = service.createAccountUserFinanceAppSuffixFormGroup();

        const accountUser = service.getAccountUserFinanceAppSuffix(formGroup) as any;

        expect(accountUser).toMatchObject({});
      });

      it('should return IAccountUserFinanceAppSuffix', () => {
        const formGroup = service.createAccountUserFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const accountUser = service.getAccountUserFinanceAppSuffix(formGroup) as any;

        expect(accountUser).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IAccountUserFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createAccountUserFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewAccountUserFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createAccountUserFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
