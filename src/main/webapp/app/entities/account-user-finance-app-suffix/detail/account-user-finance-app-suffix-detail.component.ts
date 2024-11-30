import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IAccountUserFinanceAppSuffix } from '../account-user-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-account-user-finance-app-suffix-detail',
  templateUrl: './account-user-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class AccountUserFinanceAppSuffixDetailComponent {
  accountUser = input<IAccountUserFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
