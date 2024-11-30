import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ILocationFinanceAppSuffix, NewLocationFinanceAppSuffix } from '../location-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILocationFinanceAppSuffix for edit and NewLocationFinanceAppSuffixFormGroupInput for create.
 */
type LocationFinanceAppSuffixFormGroupInput = ILocationFinanceAppSuffix | PartialWithRequiredKeyOf<NewLocationFinanceAppSuffix>;

type LocationFinanceAppSuffixFormDefaults = Pick<NewLocationFinanceAppSuffix, 'id'>;

type LocationFinanceAppSuffixFormGroupContent = {
  id: FormControl<ILocationFinanceAppSuffix['id'] | NewLocationFinanceAppSuffix['id']>;
  streetAddress: FormControl<ILocationFinanceAppSuffix['streetAddress']>;
  postalCode: FormControl<ILocationFinanceAppSuffix['postalCode']>;
  city: FormControl<ILocationFinanceAppSuffix['city']>;
  stateProvince: FormControl<ILocationFinanceAppSuffix['stateProvince']>;
  country: FormControl<ILocationFinanceAppSuffix['country']>;
};

export type LocationFinanceAppSuffixFormGroup = FormGroup<LocationFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LocationFinanceAppSuffixFormService {
  createLocationFinanceAppSuffixFormGroup(
    location: LocationFinanceAppSuffixFormGroupInput = { id: null },
  ): LocationFinanceAppSuffixFormGroup {
    const locationRawValue = {
      ...this.getFormDefaults(),
      ...location,
    };
    return new FormGroup<LocationFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: locationRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      streetAddress: new FormControl(locationRawValue.streetAddress),
      postalCode: new FormControl(locationRawValue.postalCode),
      city: new FormControl(locationRawValue.city),
      stateProvince: new FormControl(locationRawValue.stateProvince),
      country: new FormControl(locationRawValue.country),
    });
  }

  getLocationFinanceAppSuffix(form: LocationFinanceAppSuffixFormGroup): ILocationFinanceAppSuffix | NewLocationFinanceAppSuffix {
    return form.getRawValue() as ILocationFinanceAppSuffix | NewLocationFinanceAppSuffix;
  }

  resetForm(form: LocationFinanceAppSuffixFormGroup, location: LocationFinanceAppSuffixFormGroupInput): void {
    const locationRawValue = { ...this.getFormDefaults(), ...location };
    form.reset(
      {
        ...locationRawValue,
        id: { value: locationRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): LocationFinanceAppSuffixFormDefaults {
    return {
      id: null,
    };
  }
}
