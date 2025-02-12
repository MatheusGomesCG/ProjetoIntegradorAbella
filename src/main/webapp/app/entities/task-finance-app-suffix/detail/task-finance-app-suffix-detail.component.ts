import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { ITaskFinanceAppSuffix } from '../task-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-task-finance-app-suffix-detail',
  templateUrl: './task-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class TaskFinanceAppSuffixDetailComponent {
  task = input<ITaskFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
