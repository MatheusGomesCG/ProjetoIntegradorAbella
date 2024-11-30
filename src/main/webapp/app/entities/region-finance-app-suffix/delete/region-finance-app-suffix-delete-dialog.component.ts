import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import SharedModule from 'app/shared/shared.module';
import { ITEM_DELETED_EVENT } from 'app/config/navigation.constants';
import { IRegionFinanceAppSuffix } from '../region-finance-app-suffix.model';
import { RegionFinanceAppSuffixService } from '../service/region-finance-app-suffix.service';

@Component({
  standalone: true,
  templateUrl: './region-finance-app-suffix-delete-dialog.component.html',
  imports: [SharedModule, FormsModule],
})
export class RegionFinanceAppSuffixDeleteDialogComponent {
  region?: IRegionFinanceAppSuffix;

  protected regionService = inject(RegionFinanceAppSuffixService);
  protected activeModal = inject(NgbActiveModal);

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.regionService.delete(id).subscribe(() => {
      this.activeModal.close(ITEM_DELETED_EVENT);
    });
  }
}
