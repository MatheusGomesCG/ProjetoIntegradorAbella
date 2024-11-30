import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ICountryFinanceAppSuffix, NewCountryFinanceAppSuffix } from '../country-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ICountryFinanceAppSuffix for edit and NewCountryFinanceAppSuffixFormGroupInput for create.
 */
type CountryFinanceAppSuffixFormGroupInput = ICountryFinanceAppSuffix | PartialWithRequiredKeyOf<NewCountryFinanceAppSuffix>;

type CountryFinanceAppSuffixFormDefaults = Pick<NewCountryFinanceAppSuffix, 'id'>;

type CountryFinanceAppSuffixFormGroupContent = {
  id: FormControl<ICountryFinanceAppSuffix['id'] | NewCountryFinanceAppSuffix['id']>;
  countryName: FormControl<ICountryFinanceAppSuffix['countryName']>;
  region: FormControl<ICountryFinanceAppSuffix['region']>;
};

export type CountryFinanceAppSuffixFormGroup = FormGroup<CountryFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class CountryFinanceAppSuffixFormService {
  createCountryFinanceAppSuffixFormGroup(country: CountryFinanceAppSuffixFormGroupInput = { id: null }): CountryFinanceAppSuffixFormGroup {
    const countryRawValue = {
      ...this.getFormDefaults(),
      ...country,
    };
    return new FormGroup<CountryFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: countryRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      countryName: new FormControl(countryRawValue.countryName),
      region: new FormControl(countryRawValue.region),
    });
  }

  getCountryFinanceAppSuffix(form: CountryFinanceAppSuffixFormGroup): ICountryFinanceAppSuffix | NewCountryFinanceAppSuffix {
    return form.getRawValue() as ICountryFinanceAppSuffix | NewCountryFinanceAppSuffix;
  }

  resetForm(form: CountryFinanceAppSuffixFormGroup, country: CountryFinanceAppSuffixFormGroupInput): void {
    const countryRawValue = { ...this.getFormDefaults(), ...country };
    form.reset(
      {
        ...countryRawValue,
        id: { value: countryRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): CountryFinanceAppSuffixFormDefaults {
    return {
      id: null,
    };
  }
}
