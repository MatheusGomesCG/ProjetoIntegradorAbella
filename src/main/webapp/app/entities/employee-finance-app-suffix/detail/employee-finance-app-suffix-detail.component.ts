import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IEmployeeFinanceAppSuffix } from '../employee-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-employee-finance-app-suffix-detail',
  templateUrl: './employee-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class EmployeeFinanceAppSuffixDetailComponent {
  employee = input<IEmployeeFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
