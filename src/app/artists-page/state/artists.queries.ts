import gql from 'graphql-tag';

const artistFieldsFragment = `
    id
    name
    initials
    nationality
`;

const getArtists = gql`
  query getPopularArtists {
    popular_artists {
      artists {
        ${artistFieldsFragment}
      }
    }
  }
`;
const setSelectedArtists = gql`
  mutation SetSelectedArtists($artists: [Artist]!) {
    setSelectedArtists(selectedArtists: $artists) @client
  }
`;
const getSelectedArtists = gql`
  query GetSelectedArtists {
    popular_artists @client {
      selected_artists {
        ${artistFieldsFragment}
      }
    }
  }
`;

const isCompareModeEnabled = gql`
  query GetSelectedArtists {
    popular_artists @client {
      compareModeEnabled
    }
  }
`;

export const ArtistQuery = {
  getArtists
};

export const ArtistClientQuery = {
  setSelectedArtists,
  getSelectedArtists,
  isCompareModeEnabled
};
