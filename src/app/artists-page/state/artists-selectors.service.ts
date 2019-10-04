import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { ColDef } from 'ag-grid-community';
import { ArtistsService } from './artists.service';
import { map } from 'rxjs/operators';
import { Artist } from '../artists.interfaces';

@Injectable({ providedIn: 'root' })
export class ArtistsSelectorsService {
  constructor(private artistsService: ArtistsService) {}

  isCompareOperationAvailable$ = combineLatest(
    this.artistsService.selectedArtists$,
    this.artistsService.isCompareModeEnabled$
  ).pipe(
    map(
      ([artists, isCompareModeEnabled]) =>
        artists.length && !isCompareModeEnabled
    )
  );

  gridColumns$: Observable<ColDef[]> = this.artistsService.artists$.pipe(
    map((artists: Artist[]) => {
      const artistKeys = Object.keys(artists[0]).filter(
        this.omitGQLMetadataKey
      );
      const firstColumn: ColDef = this.buildFirstColumn(artistKeys[0]);
      const restColumns = artistKeys.slice(1).map(this.buildColumnMetadata);

      return [firstColumn].concat(restColumns);
    })
  );

  private buildColumnMetadata(key: string): ColDef {
    return {
      headerName: key.charAt(0).toUpperCase() + key.slice(1),
      field: key
    };
  }

  private buildFirstColumn(key: string): ColDef {
    return {
      headerCheckboxSelection: true,
      headerCheckboxSelectionFilteredOnly: true,
      checkboxSelection: true,
      ...this.buildColumnMetadata(key)
    };
  }

  private omitGQLMetadataKey(key: string) {
    return key !== '__typename';
  }
}
