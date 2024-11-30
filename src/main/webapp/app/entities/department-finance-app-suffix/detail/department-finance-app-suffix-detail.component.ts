import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';

import SharedModule from 'app/shared/shared.module';
import { DurationPipe, FormatMediumDatePipe, FormatMediumDatetimePipe } from 'app/shared/date';
import { IDepartmentFinanceAppSuffix } from '../department-finance-app-suffix.model';

@Component({
  standalone: true,
  selector: 'jhi-department-finance-app-suffix-detail',
  templateUrl: './department-finance-app-suffix-detail.component.html',
  imports: [SharedModule, RouterModule, DurationPipe, FormatMediumDatetimePipe, FormatMediumDatePipe],
})
export class DepartmentFinanceAppSuffixDetailComponent {
  department = input<IDepartmentFinanceAppSuffix | null>(null);

  previousState(): void {
    window.history.back();
  }
}
