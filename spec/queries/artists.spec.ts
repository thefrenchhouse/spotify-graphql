import { SpotifyGraphQLClient } from '../../index';
import * as nock from 'nock';

describe('Query : artists(ids: String): [Artist]', () => {

  let response = {"artists":[{"external_urls":{"spotify":"https://open.spotify.com/artist/2CIMQHirSU0MQqyYHq0eOx"},"followers":{"href":null,"total":1591278},"genres":["big room","brostep","edm","electro house","progressive house","tropical house"],"href":"https://api.spotify.com/v1/artists/2CIMQHirSU0MQqyYHq0eOx","id":"2CIMQHirSU0MQqyYHq0eOx","images":[{"height":640,"url":"https://i.scdn.co/image/86e8991077d6ce237be8f24dbc65e90f2e1f2a43","width":640},{"height":320,"url":"https://i.scdn.co/image/cd362662352ce88b693b1a31cf5c9784730291dd","width":320},{"height":160,"url":"https://i.scdn.co/image/70e010473dc0f158253111e035c71086fb7904fa","width":160}],"name":"deadmau5","popularity":74,"type":"artist","uri":"spotify:artist:2CIMQHirSU0MQqyYHq0eOx"},{"external_urls":{"spotify":"https://open.spotify.com/artist/57dN52uHvrHOxijzpIgu3E"},"followers":{"href":null,"total":334061},"genres":["alternative dance","brooklyn indie","electronic","indie pop","indietronica","new rave","synthpop"],"href":"https://api.spotify.com/v1/artists/57dN52uHvrHOxijzpIgu3E","id":"57dN52uHvrHOxijzpIgu3E","images":[{"height":693,"url":"https://i.scdn.co/image/2f0c6c465a83cd196e651e3d4e7625ba799a6f60","width":1000},{"height":444,"url":"https://i.scdn.co/image/4e3e13c8b993bde9898e49509fb9ae121636e05f","width":640},{"height":139,"url":"https://i.scdn.co/image/dc68dd24b45b74ecce9d4ed486423673d683ced3","width":200},{"height":44,"url":"https://i.scdn.co/image/4e55ca05d4f336a2fa0e3062a7ec9778a201e8bc","width":63}],"name":"Ratatat","popularity":71,"type":"artist","uri":"spotify:artist:57dN52uHvrHOxijzpIgu3E"},{"external_urls":{"spotify":"https://open.spotify.com/artist/1vCWHaC5f2uS3yhpwWbIA6"},"followers":{"href":null,"total":5307238},"genres":["big room","dance pop","edm","electro house","pop","tropical house"],"href":"https://api.spotify.com/v1/artists/1vCWHaC5f2uS3yhpwWbIA6","id":"1vCWHaC5f2uS3yhpwWbIA6","images":[{"height":1000,"url":"https://i.scdn.co/image/3a9d3815a61d321da6a6715c69b4941549121548","width":1000},{"height":640,"url":"https://i.scdn.co/image/0e31a58be43126646318ca372c7a9949132f6bf8","width":640},{"height":200,"url":"https://i.scdn.co/image/e4247c2adb526c17830aa31cef0b23351f973fec","width":200},{"height":64,"url":"https://i.scdn.co/image/0ed45b09f1f52e5e0686033534cf97bc77a5ff6f","width":64}],"name":"Avicii","popularity":81,"type":"artist","uri":"spotify:artist:1vCWHaC5f2uS3yhpwWbIA6"}]};

  nock.disableNetConnect();

  let client = SpotifyGraphQLClient({
    clientId: "clientId",
    clientSecret: "clientSecret",
    redirectUri: "http://redirectUri.dev",
    accessToken: "accessToken"
  });


  describe('when fetching a existing Albums', () => {
    let request;
    beforeEach(() => {
      request = nock('https://api.spotify.com:443')
        .get('/v1/artists?ids=2CIMQHirSU0MQqyYHq0eOx%2C57dN52uHvrHOxijzpIgu3E%2C1vCWHaC5f2uS3yhpwWbIA6')
        .reply(200, response);
    });
    afterEach(() =>  {
      nock.cleanAll();
    });

    it('should call promise success callback', (done) => {
      let onSuccess = function (executionResult: any) {
        let data = executionResult.data;
        expect(data.artists[0].name).toBe('deadmau5')
        expect(data.artists[0].id).toBe('2CIMQHirSU0MQqyYHq0eOx')
        expect(!!executionResult.errors).toBeFalsy();
        expect(request.isDone()).toBeTruthy();
        done();
      }

      let onError = () => { throw 'should not be called' };

      client.query(`
        query {
          artists(ids: "2CIMQHirSU0MQqyYHq0eOx,57dN52uHvrHOxijzpIgu3E,1vCWHaC5f2uS3yhpwWbIA6") {
            id
            name
          }
        }
       `).then(onSuccess).catch(onError);
    });
  });

});