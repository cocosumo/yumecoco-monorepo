
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
  const url = new URL(authUrl);
  const params = new URLSearchParams(url.search);
  
  params.set('client_id', clientId);
  params.set('redirect_uri', redirectURI);
  params.set('state', 'state1');
  params.set('response_type', 'code');
  params.set('scope', (scopes || authScopes).join(' '));

  return `${authUrl}?${params.toString()}`;

 
};