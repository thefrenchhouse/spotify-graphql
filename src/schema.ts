const schema = `
type Track {
  id: String
  album: SimplifiedAlbum
  artists: [SimplifiedArtist]
  available_markets: [String]
  disc_number: Int
  duration_ms: Int
  explicit: Boolean
  href: String
  is_playable: Boolean
  name: String
  popularity: Int
  preview_url: String
  track_number: Int
  type: String
  uri: String
}

type Artist {
  id: String
  genres: [String]
  href: String
  name: String
  popularity: Int
  type: String
  uri: String,
  topTracks: [Track]
}

type SimplifiedArtist {
  id: String
  href: String
  name: String
  type: String
  uri: String
}

type Album {
  id: String
  album_type: String
  artists: [Artist],
  available_markets: [String]
  genres: [String]
  href: String
  label: String
  name: String
  popularity: Int
  release_date: String
  release_date_precision: String
  type: String
  uri: String
}

type SimplifiedAlbum {
  id: String
  album_type: String
  artists: [Artist],
  available_markets: [String]
  href: String
  label: String
  name: String
  type: String
  uri: String
}

type PrivateUser {
  id: String
  birthday: String
  country: String
  display_name: String
  email: String
  href: String
  product: String
  uri: String
  tracks: [SavedTrack]
  playlists: [Playlist]
}

type SavedTrack {
  added_at: String
  track: Track
}

type PlaylistTrack {
  added_at: String
  track: Track
  added_by: PublicUser
  is_local: Boolean
}

type PublicUser {
  id: String
  display_name: String
  href: String
  uri: String
}

type Playlist {
  id: String
  description: String
  href: String
  name: String
  owner: PublicUser
  uri: String
  tracks: [PlaylistTrack]
  public: Boolean
}


# the schema allows the following query:
type Query {
  track(id: String): Track
  me(load: Boolean): PrivateUser
  user(id: String): PrivateUser
  artist(id: String): Artist
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
schema {
  query: Query
}
`;

export default schema;