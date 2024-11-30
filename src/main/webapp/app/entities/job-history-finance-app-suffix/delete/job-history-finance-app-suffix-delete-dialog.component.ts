import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IJobHistoryFinanceAppSuffix } from '../job-history-finance-app-suffix.model';
import { JobHistoryFinanceAppSuffixService } from '../service/job-history-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './job-history-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class JobHistoryFinanceAppSuffixDeleteDialogComponent {
  jobHistory?: IJobHistoryFinanceAppSuffix;

  protected jobHistoryService = inject(JobHistoryFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobHistoryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
