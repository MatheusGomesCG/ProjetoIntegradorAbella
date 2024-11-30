import { Component, OnInit, inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import SharedModule from 'app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IRegionFinanceAppSuffix } from '../region-finance-app-suffix.model';
import { RegionFinanceAppSuffixService } from '../service/region-finance-app-suffix.service';
import { RegionFinanceAppSuffixFormGroup, RegionFinanceAppSuffixFormService } from './region-finance-app-suffix-form.service';

@Component({
  standalone: true,
  selector: 'jhi-region-finance-app-suffix-update',
  templateUrl: './region-finance-app-suffix-update.component.html',
  imports: [SharedModule, FormsModule, ReactiveFormsModule],
})
export class RegionFinanceAppSuffixUpdateComponent implements OnInit {
  isSaving = false;
  region: IRegionFinanceAppSuffix | null = null;

  protected regionService = inject(RegionFinanceAppSuffixService);
  protected regionFormService = inject(RegionFinanceAppSuffixFormService);
  protected activatedRoute = inject(ActivatedRoute);

  // eslint-disable-next-line @typescript-eslint/member-ordering
  editForm: RegionFinanceAppSuffixFormGroup = this.regionFormService.createRegionFinanceAppSuffixFormGroup();

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ region }) => {
      this.region = region;
      if (region) {
        this.updateForm(region);
      }
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const region = this.regionFormService.getRegionFinanceAppSuffix(this.editForm);
    if (region.id !== null) {
      this.subscribeToSaveResponse(this.regionService.update(region));
    } else {
      this.subscribeToSaveResponse(this.regionService.create(region));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRegionFinanceAppSuffix>>): void {
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

  protected updateForm(region: IRegionFinanceAppSuffix): void {
    this.region = region;
    this.regionFormService.resetForm(this.editForm, region);
  }
}
