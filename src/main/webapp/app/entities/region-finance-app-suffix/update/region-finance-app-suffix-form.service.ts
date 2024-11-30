import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IRegionFinanceAppSuffix, NewRegionFinanceAppSuffix } from '../region-finance-app-suffix.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IRegionFinanceAppSuffix for edit and NewRegionFinanceAppSuffixFormGroupInput for create.
 */
type RegionFinanceAppSuffixFormGroupInput = IRegionFinanceAppSuffix | PartialWithRequiredKeyOf<NewRegionFinanceAppSuffix>;

type RegionFinanceAppSuffixFormDefaults = Pick<NewRegionFinanceAppSuffix, 'id'>;

type RegionFinanceAppSuffixFormGroupContent = {
  id: FormControl<IRegionFinanceAppSuffix['id'] | NewRegionFinanceAppSuffix['id']>;
  regionName: FormControl<IRegionFinanceAppSuffix['regionName']>;
};

export type RegionFinanceAppSuffixFormGroup = FormGroup<RegionFinanceAppSuffixFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class RegionFinanceAppSuffixFormService {
  createRegionFinanceAppSuffixFormGroup(region: RegionFinanceAppSuffixFormGroupInput = { id: null }): RegionFinanceAppSuffixFormGroup {
    const regionRawValue = {
      ...this.getFormDefaults(),
      ...region,
    };
    return new FormGroup<RegionFinanceAppSuffixFormGroupContent>({
      id: new FormControl(
        { value: regionRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        },
      ),
      regionName: new FormControl(regionRawValue.regionName),
    });
  }

  getRegionFinanceAppSuffix(form: RegionFinanceAppSuffixFormGroup): IRegionFinanceAppSuffix | NewRegionFinanceAppSuffix {
    return form.getRawValue() as IRegionFinanceAppSuffix | NewRegionFinanceAppSuffix;
  }

  resetForm(form: RegionFinanceAppSuffixFormGroup, region: RegionFinanceAppSuffixFormGroupInput): void {
    const regionRawValue = { ...this.getFormDefaults(), ...region };
    form.reset(
      {
        ...regionRawValue,
        id: { value: regionRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */,
    );
  }

  private getFormDefaults(): RegionFinanceAppSuffixFormDefaults {
    return {
      id: null,
    };
  }
}
