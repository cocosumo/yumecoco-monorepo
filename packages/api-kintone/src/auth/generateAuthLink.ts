
import qs from 'qs';
import { loadEnv } from 'helpers';
loadEnv();

const authScopes = [
  'k:app_record:read',
  'k:app_record:write',
  'k:app_settings:read',
  'k:app_settings:write',
  'k:file:read',
  'k:file:write',
] as const;

type Scopes = typeof authScopes[number];

export const generateAuthLink = ({
  baseURL,
  redirectURI,
  scopes,
  clientId,
} :{
  baseURL: string,
  redirectURI: string,
  scopes?: Scopes[],
  clientId: string,
}) => {
  const authUrl = `${baseURL}oauth2/authorization`;

  const data = {
    'client_id': clientId,
    'redirect_uri': redirectURI,
    'state': 'state1',
    'response_type': 'code',
    'scope': (scopes || authScopes).join(' '),
  };



  return `${authUrl}?${qs.stringify(data)}`;


};