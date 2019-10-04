import { Injectable } from '@angular/core';
import { Apollo, QueryRef } from 'apollo-angular';
import { Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap } from 'rxjs/operators';
import { ApolloQueryResult } from 'apollo-client';
import { Artist, ArtistsRequest, ArtistsState } from '../artists.interfaces';
import { ArtistClientQuery, ArtistQuery } from './artists.queries';

@Injectable({ providedIn: 'root' })
export class ArtistsService {
  private artistsQueryRef: QueryRef<ArtistsRequest> = this.apollo.watchQuery({
    query: ArtistQuery.getArtists
  });
  private selectedArtistsQueryRef: QueryRef<
    ArtistsRequest
  > = this.apollo.watchQuery({
    query: ArtistClientQuery.getSelectedArtists
  });

  private isCompareModeEnabledQueryRef: QueryRef<
    boolean
  > = this.apollo.watchQuery({
    query: ArtistClientQuery.isCompareModeEnabled
  });

  artists$: Observable<Artist[]> = this.artistsQueryRef.valueChanges.pipe(
    filter((res: ApolloQueryResult<ArtistsRequest>) => !res.loading),
    switchMap((res: ApolloQueryResult<ArtistsRequest>) =>
      // probably, should be error handling but not throwing an error (will break stream)
      res.errors ? throwError(res.errors) : of<ArtistsRequest>(res.data)
    ),
    map((res: ArtistsRequest) => res.popular_artists.artists)
  );

  selectedArtists$: Observable<
    Artist[]
  > = this.selectedArtistsQueryRef.valueChanges.pipe(
    this.pluckPropFromState('selected_artists')
  );

  isCompareModeEnabled$: Observable<
    boolean
  > = this.isCompareModeEnabledQueryRef.valueChanges.pipe(
    this.pluckPropFromState<boolean>('compareModeEnabled')
  );

  constructor(private apollo: Apollo) {}

  refetchArtists(): void {
    this.artistsQueryRef.refetch();
  }

  setCompareMode(isActive: boolean) {
    this.apollo.getClient().writeData({
      data: {
        popular_artists: {
          compareModeEnabled: isActive,
          __typename: 'PopularArtists'
        }
      }
    });
  }

  setSelectedArtists(artists: Artist[]): void {
    this.apollo
      .mutate({
        mutation: ArtistClientQuery.setSelectedArtists,
        variables: {
          artists
        }
      })
      .subscribe();
  }

  private pluckPropFromState<T>(propname: string) {
    return map<any, T>(
      (res: ApolloQueryResult<Partial<ArtistsState>>) =>
        res.data.popular_artists[propname]
    );
  }
}
