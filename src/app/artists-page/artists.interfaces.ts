export interface ArtistsState {
  popular_artists: {
    artists: Artist[];
    selected_artists: Artist[];
    compareModeEnabled: boolean;
    __typename: 'PopularArtist';
  };
}

export interface Artist {
  id: string;
  name: string;
  initials: string;
  nationality: string;
  __typename: 'Artist';
}

export interface ArtistsRequest {
  popular_artists: {
    artists: Artist[];
    __typename: 'PopularArtist';
  };
}
