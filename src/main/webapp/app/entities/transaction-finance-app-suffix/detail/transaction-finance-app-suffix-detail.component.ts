import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ITransactionFinanceAppSuffix } from '../transaction-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-transaction-finance-app-suffix-detail',
  templateUrl: './transaction-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TransactionFinanceAppSuffixDetailComponent {
  transaction = input<ITransactionFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
