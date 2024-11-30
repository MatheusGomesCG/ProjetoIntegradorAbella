import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ICountryFinanceAppSuffix } from 'app/entities/country-finance-app-suffix/country-finance-app-suffix.model';
import { CountryFinanceAppSuffixService } from 'app/entities/country-finance-app-suffix/service/country-finance-app-suffix.service';
import { ILocationFinanceAppSuffix } from '../location-finance-app-suffix.model';
import { LocationFinanceAppSuffixService } from '../service/location-finance-app-suffix.service';
import { LocationFinanceAppSuffixFormGroup, LocationFinanceAppSuffixFormService } from './location-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-location-finance-app-suffix-update',
  templateUrl: './location-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class LocationFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  location: ILocationFinanceAppSuffix | null = null;

  countriesCollection: ICountryFinanceAppSuffix[] = [];

  protected locationService = inject(LocationFinanceAppSuffixService);
  protected locationFormService = inject(LocationFinanceAppSuffixFormService);
  protected countryService = inject(CountryFinanceAppSuffixService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: LocationFinanceAppSuffixFormGroup = this.locationFormService.createLocationFinanceAppSuffixFormGroup();

  compareCountryFinanceAppSuffix = (o1: ICountryFinanceAppSuffix | null, o2: ICountryFinanceAppSuffix | null): boolean =>
    this.countryService.compareCountryFinanceAppSuffix(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ location }) => {
      this.location = location;
      if (location) {
        this.updateForm(location);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const location = this.locationFormService.getLocationFinanceAppSuffix(this.editForm);
    if (location.id !== null) {
      this.subscribeToSaveResponse(this.locationService.update(location));
    } else {
      this.subscribeToSaveResponse(this.locationService.create(location));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ILocationFinanceAppSuffix>>): void {
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

  protected updateForm(location: ILocationFinanceAppSuffix): void {
    this.location = location;
    this.locationFormService.resetForm(this.editForm, location);

    this.countriesCollection = this.countryService.addCountryFinanceAppSuffixToCollectionIfMissing<ICountryFinanceAppSuffix>(
      this.countriesCollection,
      location.country,
    );
  }

  protected loadRelationshipsOptions(): void {
    this.countryService
      .query({ filter: 'location-is-null' })
      .pipe(map((res: HttpResponse<ICountryFinanceAppSuffix[]>) => res.body ?? []))
      .pipe(
        map((countries: ICountryFinanceAppSuffix[]) =>
          this.countryService.addCountryFinanceAppSuffixToCollectionIfMissing<ICountryFinanceAppSuffix>(countries, this.location?.country),
        ),
      )
      .subscribe((countries: ICountryFinanceAppSuffix[]) => (this.countriesCollection = countries));
  }
}
