export const artistsInitialState = {
  // name is taken from query to keep local & remote state under single main object
  // IDK, mb it is better to keep local state absolutely separately
  popular_artists: {
    // if passed, blocks initial fetch (need to refetch)
    // artists: [],
    selected_artists: [],
    compareModeEnabled: false,
    __typename: 'PopularArtists'
  }
};
