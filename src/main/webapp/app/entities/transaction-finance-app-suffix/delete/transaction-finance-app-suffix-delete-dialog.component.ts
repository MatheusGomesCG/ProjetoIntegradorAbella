import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ITransactionFinanceAppSuffix } from '../transaction-finance-app-suffix.model';
import { TransactionFinanceAppSuffixService } from '../service/transaction-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './transaction-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class TransactionFinanceAppSuffixDeleteDialogComponent {
  transaction?: ITransactionFinanceAppSuffix;

  protected transactionService = inject(TransactionFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.transactionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
