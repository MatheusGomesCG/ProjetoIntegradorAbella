import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ILocationFinanceAppSuffix } from '../location-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-location-finance-app-suffix-detail',
  templateUrl: './location-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class LocationFinanceAppSuffixDetailComponent {
  location = input<ILocationFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
