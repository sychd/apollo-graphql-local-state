import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { ArtistsPageFacadeService } from './artists-page-facade.service';
import { AgGridAngular } from 'ag-grid-angular';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-artists-page',
  templateUrl: './artists-page.component.html',
  styleUrls: ['./artists-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtistsPageComponent implements OnInit, OnDestroy {
  @ViewChild('agGrid', { static: false }) agGrid: AgGridAngular;
  private destroy$$: Subject<void> = new Subject<void>();

  constructor(public facade: ArtistsPageFacadeService) {}

  ngOnInit() {
    this.facade.selectedArtists$
      .pipe(
        filter(arr => !arr.length),
        takeUntil(this.destroy$$)
      )
      .subscribe(() => setTimeout(() => this.disableCompareMode()));
  }

  ngOnDestroy() {
    this.destroy$$.next();
  }

  selectionChanged() {
    const selected = this.agGrid.api.getSelectedRows();
    this.facade.setSelectedArtists(selected);
    this.agGrid.api.onFilterChanged();
  }

  enableCompareMode() {
    this.facade.switchCompareMode(true);
    this.agGrid.api.onFilterChanged();
  }

  disableCompareMode() {
    this.facade.switchCompareMode(false);
    this.agGrid.api.onFilterChanged();
  }
}
