import { TestBed } from '@angular/core/testing';

import { sampleWithNewData, sampleWithRequiredData } from '../country-finance-app-suffix.test-samples';

import { CountryFinanceAppSuffixFormService } from './country-finance-app-suffix-form.service';

describe('CountryFinanceAppSuffix Form Service', () => {
  let service: CountryFinanceAppSuffixFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryFinanceAppSuffixFormService);
  });

  describe('Service methods', () => {
    describe('createCountryFinanceAppSuffixFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createCountryFinanceAppSuffixFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countryName: expect.any(Object),
            region: expect.any(Object),
          }),
        );
      });

      it('passing ICountryFinanceAppSuffix should create a new form with FormGroup', () => {
        const formGroup = service.createCountryFinanceAppSuffixFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            countryName: expect.any(Object),
            region: expect.any(Object),
          }),
        );
      });
    });

    describe('getCountryFinanceAppSuffix', () => {
      it('should return NewCountryFinanceAppSuffix for default CountryFinanceAppSuffix initial value', () => {
        const formGroup = service.createCountryFinanceAppSuffixFormGroup(sampleWithNewData);

        const country = service.getCountryFinanceAppSuffix(formGroup) as any;

        expect(country).toMatchObject(sampleWithNewData);
      });

      it('should return NewCountryFinanceAppSuffix for empty CountryFinanceAppSuffix initial value', () => {
        const formGroup = service.createCountryFinanceAppSuffixFormGroup();

        const country = service.getCountryFinanceAppSuffix(formGroup) as any;

        expect(country).toMatchObject({});
      });

      it('should return ICountryFinanceAppSuffix', () => {
        const formGroup = service.createCountryFinanceAppSuffixFormGroup(sampleWithRequiredData);

        const country = service.getCountryFinanceAppSuffix(formGroup) as any;

        expect(country).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing ICountryFinanceAppSuffix should not enable id FormControl', () => {
        const formGroup = service.createCountryFinanceAppSuffixFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewCountryFinanceAppSuffix should disable id FormControl', () => {
        const formGroup = service.createCountryFinanceAppSuffixFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
