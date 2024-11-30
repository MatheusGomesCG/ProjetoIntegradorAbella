import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IRegionFinanceAppSuffix } from 'app/entities/region-finance-app-suffix/region-finance-app-suffix.model';
import { RegionFinanceAppSuffixService } from 'app/entities/region-finance-app-suffix/service/region-finance-app-suffix.service';
import { ICountryFinanceAppSuffix } from '../country-finance-app-suffix.model';
import { CountryFinanceAppSuffixService } from '../service/country-finance-app-suffix.service';
import { CountryFinanceAppSuffixFormGroup, CountryFinanceAppSuffixFormService } from './country-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-country-finance-app-suffix-update',
  templateUrl: './country-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class CountryFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  country: ICountryFinanceAppSuffix | null = null;

  regionsCollection: IRegionFinanceAppSuffix[] = [];

  protected countryService = inject(CountryFinanceAppSuffixService);
  protected countryFormService = inject(CountryFinanceAppSuffixFormService);
  protected regionService = inject(RegionFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: CountryFinanceAppSuffixFormGroup = this.countryFormService.createCountryFinanceAppSuffixFormGroup();

  compareRegionFinanceAppSuffix = (o1: IRegionFinanceAppSuffix | null, o2: IRegionFinanceAppSuffix | null): boolean =>
    this.regionService.compareRegionFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ country }) => {
      this.country = country;
      if (country) {
        this.updateForm(country);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const country = this.countryFormService.getCountryFinanceAppSuffix(this.editForm);
    if (country.id !== null) {
      this.subscribeToSaveResponse(this.countryService.update(country));
    } else {
      this.subscribeToSaveResponse(this.countryService.create(country));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICountryFinanceAppSuffix>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(country: ICountryFinanceAppSuffix): void {
    this.country = country;
    this.countryFormService.resetForm(this.editForm, country);

    this.regionsCollection = this.regionService.addRegionFinanceAppSuffixToCollectionIfMissing<IRegionFinanceAppSuffix>(
      this.regionsCollection,
      country.region,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.regionService
      .query({ filter: 'country-is-null' })
      .pipe(map((res: HttpResponse<IRegionFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((regions: IRegionFinanceAppSuffix[]) =>
          this.regionService.addRegionFinanceAppSuffixToCollectionIfMissing<IRegionFinanceAppSuffix>(regions, this.country?.region),
        ),
      )
      .subscribe((regions: IRegionFinanceAppSuffix[]) => (this.regionsCollection = regions));
  }
}
