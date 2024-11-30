import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IInvestmentFinanceAppSuffix } from '../investment-finance-app-suffix.model';
import { InvestmentFinanceAppSuffixService } from '../service/investment-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './investment-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class InvestmentFinanceAppSuffixDeleteDialogComponent {
  investment?: IInvestmentFinanceAppSuffix;

  protected investmentService = inject(InvestmentFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.investmentService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
