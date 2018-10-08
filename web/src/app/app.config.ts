const config = {
  name: 'Angular Demo',
  server: {
    dev: {
      url: 'http://localhost:3000/api'
    },
    prod: {
      url: 'https://angular-demo.dev/api'
    }
  },
  jwt: {
    tokenKey: 'ng-demo'
  },
  getApi(item = 'url') {
    let server = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') ? 'dev' : 'prod';

    return this.server[server][item];
  },
};

export default config;