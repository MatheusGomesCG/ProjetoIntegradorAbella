import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IRegionFinanceAppSuffix } from '../region-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-region-finance-app-suffix-detail',
  templateUrl: './region-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class RegionFinanceAppSuffixDetailComponent {
  region = input<IRegionFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
