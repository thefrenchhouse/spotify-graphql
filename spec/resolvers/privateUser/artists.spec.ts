import { SpotifyGraphQLClient } from '../../../index';
import * as nock from 'nock';

process.on('unhandledRejection', (reason) => {
    console.log('Reason: ' + reason);
});

describe('Resolver : me.artists', () => {

  let meResponse = {"birthdate":"1992-04-21","country":"FR","display_name":"Charly Poly","email":"charly.poly@live.fr","external_urls":{"spotify":"https://open.spotify.com/user/11879785"},"followers":{"href":null,"total":14},"href":"https://api.spotify.com/v1/users/11879785","id":"11879785","images":[{"height":null,"url":"https://scontent.xx.fbcdn.net/v/t1.0-1/p200x200/14708149_10210705575656755_6613177863427368468_n.jpg?oh=edeed1fffe34e4a0f57669b5ffbb3def&oe=5914212D","width":null}],"product":"premium","type":"user","uri":"spotify:user:11879785"};
  let meArtistsResponse = {"artists":{"items":[{"external_urls":{"spotify":"https://open.spotify.com/artist/04gDigrS5kc9YWfZHwBETP"},"followers":{"href":null,"total":7677866},"genres":["dance pop","pop","pop christmas"],"href":"https://api.spotify.com/v1/artists/04gDigrS5kc9YWfZHwBETP","id":"04gDigrS5kc9YWfZHwBETP","images":[{"height":640,"url":"https://i.scdn.co/image/5eb1ba2ee2551e02006a433b4e1ec98075645e9b","width":640},{"height":320,"url":"https://i.scdn.co/image/f2833af05c1ae1278585ae7de0dc59b2130f27bf","width":320},{"height":160,"url":"https://i.scdn.co/image/67c4150ffb16cba6dfdf45d23382c5c2e5c91156","width":160}],"name":"Maroon 5","popularity":87,"type":"artist","uri":"spotify:artist:04gDigrS5kc9YWfZHwBETP"},{"external_urls":{"spotify":"https://open.spotify.com/artist/05fG473iIaoy82BF1aGhL8"},"followers":{"href":null,"total":1690237},"genres":["alternative metal","nu metal","post-grunge","rap metal","rap rock","rock"],"href":"https://api.spotify.com/v1/artists/05fG473iIaoy82BF1aGhL8","id":"05fG473iIaoy82BF1aGhL8","images":[{"height":749,"url":"https://i.scdn.co/image/0d4156d2128ea5589296f10da242b2f0a917153d","width":1000},{"height":479,"url":"https://i.scdn.co/image/7b3df593f9c812f20096e0228c4e8bc48774d654","width":640},{"height":150,"url":"https://i.scdn.co/image/4f9017a0a2d85753832ee3e24e879a87ec9b6594","width":200},{"height":48,"url":"https://i.scdn.co/image/1f438753b0ac3c017aa6e9dc15aaee4d292f3163","width":64}],"name":"Slipknot","popularity":74,"type":"artist","uri":"spotify:artist:05fG473iIaoy82BF1aGhL8"},{"external_urls":{"spotify":"https://open.spotify.com/artist/07YZf4WDAMNwqr4jfgOZ8y"},"followers":{"href":null,"total":2524750},"genres":["dance pop","pop","pop rap","post-teen pop","r&b"],"href":"https://api.spotify.com/v1/artists/07YZf4WDAMNwqr4jfgOZ8y","id":"07YZf4WDAMNwqr4jfgOZ8y","images":[{"height":640,"url":"https://i.scdn.co/image/6981a8c96e67f0b3e1fd24a7c5a8d735054b1c0f","width":640},{"height":320,"url":"https://i.scdn.co/image/08f6419e02f329a3ee9ed8d1e9dce84cf11e7695","width":320},{"height":160,"url":"https://i.scdn.co/image/537407e42732b2b1d27c78f14f6789c1d097c445","width":160}],"name":"Jason Derulo","popularity":81,"type":"artist","uri":"spotify:artist:07YZf4WDAMNwqr4jfgOZ8y"},{"external_urls":{"spotify":"https://open.spotify.com/artist/085pc2PYOi8bGKj0PNjekA"},"followers":{"href":null,"total":1100736},"genres":["dance pop","pop","pop rap","post-teen pop","r&b","tropical house"],"href":"https://api.spotify.com/v1/artists/085pc2PYOi8bGKj0PNjekA","id":"085pc2PYOi8bGKj0PNjekA","images":[{"height":563,"url":"https://i.scdn.co/image/209da442883f43abea9ac0428f9ae704867859ef","width":1000},{"height":360,"url":"https://i.scdn.co/image/1129687431a6f10c40d9bad8fa288f018fed4215","width":640},{"height":113,"url":"https://i.scdn.co/image/c0be328a0231bc8a8b388908e5deb8edf39d74d3","width":200},{"height":36,"url":"https://i.scdn.co/image/a4cc50668e961ade3a6050d25461ab3f50a0b28a","width":64}],"name":"will.i.am","popularity":69,"type":"artist","uri":"spotify:artist:085pc2PYOi8bGKj0PNjekA"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0C8ZW7ezQVs4URX5aX7Kqx"},"followers":{"href":null,"total":3821444},"genres":["dance pop","pop","post-teen pop"],"href":"https://api.spotify.com/v1/artists/0C8ZW7ezQVs4URX5aX7Kqx","id":"0C8ZW7ezQVs4URX5aX7Kqx","images":[{"height":640,"url":"https://i.scdn.co/image/c58525e97fc10d961a56c9bfcf13460e5317fa7c","width":640},{"height":320,"url":"https://i.scdn.co/image/8c48d9a1d80764b73c1a1bf50fd7c2f5852182e3","width":320},{"height":160,"url":"https://i.scdn.co/image/2088ce568c63e1d6b2dd0435c6741be151afa53d","width":160}],"name":"Selena Gomez","popularity":87,"type":"artist","uri":"spotify:artist:0C8ZW7ezQVs4URX5aX7Kqx"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0CEFCo8288kQU7mJi25s6E"},"followers":{"href":null,"total":698030},"genres":["alternative metal","nu metal","pixie","pop punk","post-grunge","punk christmas","rap metal","rap rock","screamo"],"href":"https://api.spotify.com/v1/artists/0CEFCo8288kQU7mJi25s6E","id":"0CEFCo8288kQU7mJi25s6E","images":[{"height":667,"url":"https://i.scdn.co/image/6a5caf9af5770c29e91efcfcef73bdc4b8e642e6","width":1000},{"height":427,"url":"https://i.scdn.co/image/05f9e1dc16cdbee9af5022f5408dfb0d1fe1c7d4","width":640},{"height":133,"url":"https://i.scdn.co/image/d332cafccaf353462f847b824bd850f086042a50","width":200},{"height":43,"url":"https://i.scdn.co/image/dd9ef09a6879db24ca5f559f93f4e717eea3b08f","width":64}],"name":"Hollywood Undead","popularity":69,"type":"artist","uri":"spotify:artist:0CEFCo8288kQU7mJi25s6E"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0FWzNDaEu9jdgcYTbcOa4F"},"followers":{"href":null,"total":281161},"genres":["dance pop","electropowerpop","emo","pop","pop punk","pop rap","post-teen pop"],"href":"https://api.spotify.com/v1/artists/0FWzNDaEu9jdgcYTbcOa4F","id":"0FWzNDaEu9jdgcYTbcOa4F","images":[{"height":640,"url":"https://i.scdn.co/image/305a374cd85f4be8c8dc0aaabd06b2b45d774eab","width":640},{"height":320,"url":"https://i.scdn.co/image/ef84f6e97e24cfe641d926cc30edfee8bc0a1d7e","width":320},{"height":160,"url":"https://i.scdn.co/image/816345628a592950a5571e98c21515d223d078d7","width":160}],"name":"3OH!3","popularity":62,"type":"artist","uri":"spotify:artist:0FWzNDaEu9jdgcYTbcOa4F"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0KyCXNSa7ZMb5LydfKbLG3"},"followers":{"href":null,"total":53271},"genres":["album rock","blues-rock","classic rock","funk rock","glam metal","hard rock","mellow gold","metal","neo classical metal","rock"],"href":"https://api.spotify.com/v1/artists/0KyCXNSa7ZMb5LydfKbLG3","id":"0KyCXNSa7ZMb5LydfKbLG3","images":[{"height":426,"url":"https://i.scdn.co/image/03687c399b7f43ffd04758ed82047af5b1df8673","width":640},{"height":133,"url":"https://i.scdn.co/image/7160bb590248ebbef0d7e18fb841ed572e8782e5","width":200},{"height":43,"url":"https://i.scdn.co/image/47ad218ed4c8dc703995bf1f8139a63ce3f4a46b","width":64}],"name":"David Lee Roth","popularity":45,"type":"artist","uri":"spotify:artist:0KyCXNSa7ZMb5LydfKbLG3"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0ONHkAv9pCAFxb0zJwDNTy"},"followers":{"href":null,"total":340294},"genres":["dirty south rap","dwn trap","gangster rap","hip hop","indie r&b","pop rap","rap","southern hip hop","trap music","underground hip hop"],"href":"https://api.spotify.com/v1/artists/0ONHkAv9pCAFxb0zJwDNTy","id":"0ONHkAv9pCAFxb0zJwDNTy","images":[{"height":1250,"url":"https://i.scdn.co/image/ce12fe44acbc040c65c0610f341e7aff426031ca","width":1000},{"height":800,"url":"https://i.scdn.co/image/86832e52518c9141939d00a4cf3c9ee3a3e79357","width":640},{"height":250,"url":"https://i.scdn.co/image/b1d594dd6a892a57f414ca376e0343d466472f4c","width":200},{"height":80,"url":"https://i.scdn.co/image/254c618a1076a9139c704839c7bd18cbc1a41285","width":64}],"name":"Pusha T","popularity":72,"type":"artist","uri":"spotify:artist:0ONHkAv9pCAFxb0zJwDNTy"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0RqtSIYZmd4fiBKVFqyIqD"},"followers":{"href":null,"total":1215066},"genres":["alternative metal","alternative rock","nu metal","pop punk","pop rock","post-grunge","rap metal","rap rock","rock"],"href":"https://api.spotify.com/v1/artists/0RqtSIYZmd4fiBKVFqyIqD","id":"0RqtSIYZmd4fiBKVFqyIqD","images":[{"height":640,"url":"https://i.scdn.co/image/5d927a50a5ba239e233a171e57102f715fbb17fe","width":640},{"height":320,"url":"https://i.scdn.co/image/554154efe8a76eb83ec394a903f3f053294a42c2","width":320},{"height":160,"url":"https://i.scdn.co/image/97bd46f3bed7d52937557f30c9f3b41da63dad1c","width":160}],"name":"Thirty Seconds To Mars","popularity":68,"type":"artist","uri":"spotify:artist:0RqtSIYZmd4fiBKVFqyIqD"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0SwO7SWeDHJijQ3XNS7xEE"},"followers":{"href":null,"total":839655},"genres":["alternative dance","alternative rock","brooklyn indie","garage rock","indie pop","indie rock","indietronica","neo-psychedelic","synthpop"],"href":"https://api.spotify.com/v1/artists/0SwO7SWeDHJijQ3XNS7xEE","id":"0SwO7SWeDHJijQ3XNS7xEE","images":[{"height":735,"url":"https://i.scdn.co/image/9c3d6cdd847c1645781638b6a9e449887647dcf1","width":1000},{"height":471,"url":"https://i.scdn.co/image/224f545b9cee8ced5f1b94722bcb320cf830ccd0","width":640},{"height":147,"url":"https://i.scdn.co/image/96ccd064affcfcb460dd6fd56232e5e077662e4c","width":200},{"height":47,"url":"https://i.scdn.co/image/6d705a3878fa4becf53fc0155f8be1e860e237c9","width":64}],"name":"MGMT","popularity":71,"type":"artist","uri":"spotify:artist:0SwO7SWeDHJijQ3XNS7xEE"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0VJIBKdqJygrupAxpSTk7q"},"followers":{"href":null,"total":93376},"genres":["french reggae","french rock"],"href":"https://api.spotify.com/v1/artists/0VJIBKdqJygrupAxpSTk7q","id":"0VJIBKdqJygrupAxpSTk7q","images":[{"height":1000,"url":"https://i.scdn.co/image/a0cd1a6bf95d45d3cebfeb75047404a94e534cd0","width":1000},{"height":640,"url":"https://i.scdn.co/image/423dcaed0fa6f65e25b1f9b3a8a9c55a8165a930","width":640},{"height":200,"url":"https://i.scdn.co/image/06234de657dabb647935341bb318b200756639dc","width":200},{"height":64,"url":"https://i.scdn.co/image/714e87eb3a568960cfb8a589a5fda1b7c0997c25","width":64}],"name":"Shaka Ponk","popularity":45,"type":"artist","uri":"spotify:artist:0VJIBKdqJygrupAxpSTk7q"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0WfaItAbs4vlgIA1cuqGtJ"},"followers":{"href":null,"total":185168},"genres":["channel pop","pop christmas","viral pop"],"href":"https://api.spotify.com/v1/artists/0WfaItAbs4vlgIA1cuqGtJ","id":"0WfaItAbs4vlgIA1cuqGtJ","images":[{"height":640,"url":"https://i.scdn.co/image/efe1b254bfd1e423df94d8d756d1e24c94d57e62","width":640},{"height":320,"url":"https://i.scdn.co/image/03bbeff7c774bafc2e6d232f521d0e699526bd71","width":320},{"height":160,"url":"https://i.scdn.co/image/cec976f99a33b7d0d2c5239c6469bd1019548a9d","width":160}],"name":"Daniela Andrade","popularity":61,"type":"artist","uri":"spotify:artist:0WfaItAbs4vlgIA1cuqGtJ"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0Y5tJX1MQlPlqiwlOH1tJY"},"followers":{"href":null,"total":839236},"genres":["dwn trap","pop rap","rap","trap music"],"href":"https://api.spotify.com/v1/artists/0Y5tJX1MQlPlqiwlOH1tJY","id":"0Y5tJX1MQlPlqiwlOH1tJY","images":[{"height":640,"url":"https://i.scdn.co/image/bbab705fecb1133cf5d3580f7cdb32966797b7e4","width":640},{"height":320,"url":"https://i.scdn.co/image/78b7b6b6b69baa0fe4352e2edd349895cf737141","width":320},{"height":160,"url":"https://i.scdn.co/image/270570e16abb405058f22a9d35a5f27aab0211f4","width":160}],"name":"Travis Scott","popularity":85,"type":"artist","uri":"spotify:artist:0Y5tJX1MQlPlqiwlOH1tJY"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0c173mlxpT3dSFRgMO8XPh"},"followers":{"href":null,"total":1955898},"genres":["detroit hip hop","dwn trap","pop rap","rap","trap music"],"href":"https://api.spotify.com/v1/artists/0c173mlxpT3dSFRgMO8XPh","id":"0c173mlxpT3dSFRgMO8XPh","images":[{"height":640,"url":"https://i.scdn.co/image/20495e4cd325478c667235849a7fc26099721cfd","width":640},{"height":320,"url":"https://i.scdn.co/image/682bc7dfc5d24bc5226d60c3922e70cd94a18388","width":320},{"height":160,"url":"https://i.scdn.co/image/fab51295cd497ed5f9177be375b8d9e3a6e7c188","width":160}],"name":"Big Sean","popularity":87,"type":"artist","uri":"spotify:artist:0c173mlxpT3dSFRgMO8XPh"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0du5cEVh5yTK9QJze8zA0C"},"followers":{"href":null,"total":5937708},"genres":["dance pop","pop"],"href":"https://api.spotify.com/v1/artists/0du5cEVh5yTK9QJze8zA0C","id":"0du5cEVh5yTK9QJze8zA0C","images":[{"height":640,"url":"https://i.scdn.co/image/aa32d6d4ca2467974403518dd3ebfe8831c5ced1","width":640},{"height":320,"url":"https://i.scdn.co/image/63cad86cb183568085a4e5f0be86aa187cc511e4","width":320},{"height":160,"url":"https://i.scdn.co/image/5461dcbb3f23e1df62d85c8273fc49cc4edd49d5","width":160}],"name":"Bruno Mars","popularity":89,"type":"artist","uri":"spotify:artist:0du5cEVh5yTK9QJze8zA0C"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0fauHpmSHwodVYIjTqOGHz"},"followers":{"href":null,"total":391252},"genres":["classify"],"href":"https://api.spotify.com/v1/artists/0fauHpmSHwodVYIjTqOGHz","id":"0fauHpmSHwodVYIjTqOGHz","images":[{"height":1500,"url":"https://i.scdn.co/image/d73f8e8096a7c8c9f7730bd37aacfd99c20ff393","width":1000},{"height":960,"url":"https://i.scdn.co/image/c949101244039e8a2a859ff9106cff041d642192","width":640},{"height":300,"url":"https://i.scdn.co/image/238c6208d9a507d31dfe2fd367900bc04d506744","width":200},{"height":96,"url":"https://i.scdn.co/image/a13326561dbc914c8c2c9471dd813983fc80e992","width":64}],"name":"Yiruma","popularity":67,"type":"artist","uri":"spotify:artist:0fauHpmSHwodVYIjTqOGHz"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0g7hZVprd3orBpMrSLWeJ9"},"followers":{"href":null,"total":28650},"genres":["chanson","francoton","french pop"],"href":"https://api.spotify.com/v1/artists/0g7hZVprd3orBpMrSLWeJ9","id":"0g7hZVprd3orBpMrSLWeJ9","images":[{"height":1000,"url":"https://i.scdn.co/image/0f0e5fc765105876d4c1cc3e5696c712aba682af","width":1000},{"height":640,"url":"https://i.scdn.co/image/a0aacf6d30e0828f29de8d268636b3fea227c276","width":640},{"height":200,"url":"https://i.scdn.co/image/a9aa2e17227b543d6a9593d5758352e0eea0120f","width":200},{"height":64,"url":"https://i.scdn.co/image/107aac81cab347cb7644fbbeefdb50ffb7283653","width":64}],"name":"Florent Pagny","popularity":48,"type":"artist","uri":"spotify:artist:0g7hZVprd3orBpMrSLWeJ9"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0hCNtLu0JehylgoiP8L4Gh"},"followers":{"href":null,"total":5203767},"genres":["dance pop","hip pop","pop","pop rap"],"href":"https://api.spotify.com/v1/artists/0hCNtLu0JehylgoiP8L4Gh","id":"0hCNtLu0JehylgoiP8L4Gh","images":[{"height":640,"url":"https://i.scdn.co/image/7408416f7ec33b4bc6b4cd974dc437170d534f7d","width":640},{"height":320,"url":"https://i.scdn.co/image/f17660634a4874a164a24578e40f75f6f597cceb","width":320},{"height":160,"url":"https://i.scdn.co/image/81b54607dce59de138fa904e728df687021819d5","width":160}],"name":"Nicki Minaj","popularity":89,"type":"artist","uri":"spotify:artist:0hCNtLu0JehylgoiP8L4Gh"},{"external_urls":{"spotify":"https://open.spotify.com/artist/0hEurMDQu99nJRq8pTxO14"},"followers":{"href":null,"total":2111733},"genres":["folk-pop","neo mellow","pop","pop rock","singer-songwriter"],"href":"https://api.spotify.com/v1/artists/0hEurMDQu99nJRq8pTxO14","id":"0hEurMDQu99nJRq8pTxO14","images":[{"height":640,"url":"https://i.scdn.co/image/96a2e527431f7bf39cea4bf8702fc8159f08e2aa","width":640},{"height":320,"url":"https://i.scdn.co/image/5141cdd3e766fdf922fac1fb1ffb404b7536c8cd","width":320},{"height":160,"url":"https://i.scdn.co/image/f0e8d6a32549e39ed2d13f79e1f6561bcd44cc1f","width":160}],"name":"John Mayer","popularity":81,"type":"artist","uri":"spotify:artist:0hEurMDQu99nJRq8pTxO14"}],"next":"https://api.spotify.com/v1/me/following?type=artist&after=0hEurMDQu99nJRq8pTxO14&limit=20","total":161,"cursors":{"after":""},"limit":20,"href":"https://api.spotify.com/v1/me/following?type=artist&limit=20"}};

  nock.disableNetConnect();

  let client = SpotifyGraphQLClient({
    clientId: "clientId",
    clientSecret: "clientSecret",
    redirectUri: "http://redirectUri.dev",
    accessToken: "accessToken"
  });


  fdescribe('when fetching', () => {
    let meRequest, meTopArtistsRequest;
    beforeEach(() => {
      meRequest = nock('https://api.spotify.com:443')
        .get('/v1/me')
        .reply(200, meResponse);
      meTopArtistsRequest = nock('https://api.spotify.com:443')
        .get('/v1/me/following?type=artist')
        .reply(200, meArtistsResponse);
    });
    afterEach(() =>  {
      nock.cleanAll();
    });

    it('should call promise success callback', (done) => {
      let onSuccess = function (executionResult: any) {
        console.log(JSON.stringify(executionResult));
        let data = executionResult.data;
        expect(data.me.artists[0].id).toBe('04gDigrS5kc9YWfZHwBETP');
        expect(!!executionResult.errors).toBeFalsy();
        expect(meRequest.isDone()).toBeTruthy();
        expect(meTopArtistsRequest.isDone()).toBeTruthy();
        done();
      }

      let onError = (e) => { throw e };

      client.query(`
        query {
          me {
            id
            artists {
               id
            }
          }
        }
       `).then(onSuccess).catch(onError);
    });
  });

});