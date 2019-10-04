import { Injectable } from '@angular/core';
import { ColDef, GridOptions, RowNode } from 'ag-grid-community';
import { ArtistsSelectorsService } from './state/artists-selectors.service';
import { ArtistsService } from './state/artists.service';
import { Observable } from 'rxjs';
import { Artist } from './artists.interfaces';

@Injectable({ providedIn: 'root' })
export class ArtistsPageFacadeService {
  agGridOptions: GridOptions = {
    rowSelection: 'multiple',
    rowMultiSelectWithClick: true,
    suppressCellSelection: true,
    doesExternalFilterPass: (node: RowNode) => node.isSelected(),
    isExternalFilterPresent: () => this.isCompareModeEnabled
  };

  artists$: Observable<Artist[]> = this.artistsService.artists$;
  selectedArtists$: Observable<Artist[]> = this.artistsService.selectedArtists$;
  gridColumns$: Observable<ColDef[]> = this.artistsSelectorsService
    .gridColumns$;
  isCompareOperationAvailable$: Observable<boolean> = this
    .artistsSelectorsService.isCompareOperationAvailable$;
  isCompareModeEnabled$: Observable<boolean> = this.artistsService
    .isCompareModeEnabled$;

  private isCompareModeEnabled: boolean;
  constructor(
    private artistsSelectorsService: ArtistsSelectorsService,
    private artistsService: ArtistsService
  ) {
    this.isCompareModeEnabled$.subscribe(isEnabled => {
      this.isCompareModeEnabled = isEnabled;
    });
  }

  setSelectedArtists(artists: Artist[]) {
    this.artistsService.setSelectedArtists(artists);
  }

  switchCompareMode(isActive: boolean) {
    this.artistsService.setCompareMode(isActive);
  }
}
