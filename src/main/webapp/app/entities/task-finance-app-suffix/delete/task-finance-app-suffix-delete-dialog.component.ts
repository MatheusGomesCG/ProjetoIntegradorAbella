import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITaskFinanceAppSuffix } from '../task-finance-app-suffix.model';
import { TaskFinanceAppSuffixService } from '../service/task-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './task-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TaskFinanceAppSuffixDeleteDialogComponent {
  task?: ITaskFinanceAppSuffix;

  protected taskService = inject(TaskFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.taskService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
