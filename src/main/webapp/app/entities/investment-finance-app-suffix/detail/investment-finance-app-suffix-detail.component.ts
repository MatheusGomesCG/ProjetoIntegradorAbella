import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IInvestmentFinanceAppSuffix } from '../investment-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-investment-finance-app-suffix-detail',
  templateUrl: './investment-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class InvestmentFinanceAppSuffixDetailComponent {
  investment = input<IInvestmentFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
