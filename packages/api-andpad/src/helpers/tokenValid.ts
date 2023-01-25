
type TokenDates = {
  created_at: number,
  expires_in: number
};

export default function tokenValid(token: TokenDates) {
  const now = Date.now() / 1000;
  const expiry = token.created_at + token.expires_in;

  return now < expiry;
}