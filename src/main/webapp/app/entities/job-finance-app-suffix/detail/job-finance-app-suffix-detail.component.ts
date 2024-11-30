import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IJobFinanceAppSuffix } from '../job-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-job-finance-app-suffix-detail',
  templateUrl: './job-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class JobFinanceAppSuffixDetailComponent {
  job = input<IJobFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
