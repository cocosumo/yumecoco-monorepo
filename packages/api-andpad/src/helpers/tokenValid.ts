import { AuthToken } from '../types';

export default function tokenValid(token: AuthToken) {
  const now = Date.now() / 1000;
  const expiry = token.created_at + token.expires_in;
  return now < expiry;
}