import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IDepartmentFinanceAppSuffix } from '../department-finance-app-suffix.model';
import { DepartmentFinanceAppSuffixService } from '../service/department-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './department-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class DepartmentFinanceAppSuffixDeleteDialogComponent {
  department?: IDepartmentFinanceAppSuffix;

  protected departmentService = inject(DepartmentFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.departmentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
