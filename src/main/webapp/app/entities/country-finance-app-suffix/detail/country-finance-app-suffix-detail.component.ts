import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ICountryFinanceAppSuffix } from '../country-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-country-finance-app-suffix-detail',
  templateUrl: './country-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class CountryFinanceAppSuffixDetailComponent {
  country = input<ICountryFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
