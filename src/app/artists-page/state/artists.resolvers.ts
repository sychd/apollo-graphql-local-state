export const ArtistsResolvers = {
  Mutation: {
    setSelectedArtists: (obj, args, context, info) => {
      context.cache.writeData({
        data: {
          popular_artists: {
            selected_artists: args.selectedArtists,
            __typename: 'PopularArtists'
          }
        }
      });
    }
  }
};
