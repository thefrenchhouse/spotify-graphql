import SpotifyGraphQLClient from '../src/spotify-graphql';
import config from './config';

SpotifyGraphQLClient.create(config).query(`
  {
    user(id: "11879785") {
      playlists {
        name
        tracks {
          track {
            id
            name
          }
        }
      }
    }
  }
`).then(result => {
  console.log(JSON.stringify(result));
});