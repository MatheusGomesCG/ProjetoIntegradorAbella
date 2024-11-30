import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IJobFinanceAppSuffix } from '../job-finance-app-suffix.model';
import { JobFinanceAppSuffixService } from '../service/job-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './job-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class JobFinanceAppSuffixDeleteDialogComponent {
  job?: IJobFinanceAppSuffix;

  protected jobService = inject(JobFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.jobService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
