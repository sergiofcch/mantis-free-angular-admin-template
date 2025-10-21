import packageInfo from '../../package.json';

export const environment = {
  urlApi: 'http://192.168.5.1:8083/api/v1',
  appVersion: packageInfo.version,
  production: true
};
