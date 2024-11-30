import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IJobHistoryFinanceAppSuffix } from '../job-history-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-job-history-finance-app-suffix-detail',
  templateUrl: './job-history-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class JobHistoryFinanceAppSuffixDetailComponent {
  jobHistory = input<IJobHistoryFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
