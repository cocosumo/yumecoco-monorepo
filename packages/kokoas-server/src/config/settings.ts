import fs from 'fs/promises';
import path from 'path';

import docusign from 'docusign-esign';
import { loadEnv } from 'libs';
import { isProd } from 'config';
loadEnv();



export const ds = docusign;
export const oAuth = ds.ApiClient.OAuth;
export const restApi = ds.ApiClient.RestApi;

export const basePath = restApi.BasePath[isProd ? 'PRODUCTION' : 'DEMO'];
export const oAuthBasePath = oAuth.BasePath[isProd ? 'PRODUCTION' : 'DEMO'];
export const redirectURI = 'http://localhost';
export const expiresIn = 60 * 60 * 8;
export const tokenReplaceMin = 10;


export const getPrivateKey = async () => {
  return fs
    .readFile(
      path.join(__dirname, 'keys', (isProd ? 'prod-' : '') + 'private.key'),
    );
};

export const integratorKey = <string>process.env.DS_INTEGRATOR_KEY;
export const userId = <string>process.env[isProd ? 'DS_USER_ID_PROD' : 'DS_USER_ID'];
export const accoutId = <string>process.env[isProd ? 'DS_ACCOUNT_ID_PROD' : 'DS_ACCOUNT_ID'];

export const scopes = [
  oAuth.Scope.SIGNATURE,
  oAuth.Scope.IMPERSONATION,
];

export const apiClient = new ds.ApiClient({
  basePath: basePath,
  oAuthBasePath: oAuthBasePath,

});

export const getEnvelopesApi = () => new docusign.EnvelopesApi(apiClient);

console.log('Starting with integrator key', process.env.DS_INTEGRATOR_KEY);
console.log('Integrator key ' + integratorKey);
console.log('userId ' + userId);
console.log('ENV: ', process.env.NODE_ENV);
console.log('BasePath: ', basePath);
