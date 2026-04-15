import packageInfo from '../../package.json';

export const environment = {
  urlApi: (typeof window !== 'undefined' && (window as any).BACKEND_URL)
    ? `${(window as any).BACKEND_URL}/api/v1`
    : 'http://localhost:8083/api/v1',
  appVersion: packageInfo.version,
  production: true
};
