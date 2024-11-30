import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { ILocationFinanceAppSuffix } from '../location-finance-app-suffix.model';
import { LocationFinanceAppSuffixService } from '../service/location-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './location-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class LocationFinanceAppSuffixDeleteDialogComponent {
  location?: ILocationFinanceAppSuffix;

  protected locationService = inject(LocationFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.locationService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
