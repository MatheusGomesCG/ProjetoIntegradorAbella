import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IEmployeeFinanceAppSuffix } from '../employee-finance-app-suffix.model';
import { EmployeeFinanceAppSuffixService } from '../service/employee-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './employee-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class EmployeeFinanceAppSuffixDeleteDialogComponent {
  employee?: IEmployeeFinanceAppSuffix;

  protected employeeService = inject(EmployeeFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.employeeService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
