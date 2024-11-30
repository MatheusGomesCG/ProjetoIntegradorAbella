import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IAccountUserFinanceAppSuffix } from '../account-user-finance-app-suffix.model';
import { AccountUserFinanceAppSuffixService } from '../service/account-user-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './account-user-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class AccountUserFinanceAppSuffixDeleteDialogComponent {
  accountUser?: IAccountUserFinanceAppSuffix;

  protected accountUserService = inject(AccountUserFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.accountUserService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
