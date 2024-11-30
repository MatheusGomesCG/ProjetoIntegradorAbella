import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ICountryFinanceAppSuffix } from '../country-finance-app-suffix.model';
import { CountryFinanceAppSuffixService } from '../service/country-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './country-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class CountryFinanceAppSuffixDeleteDialogComponent {
  country?: ICountryFinanceAppSuffix;

  protected countryService = inject(CountryFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.countryService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
