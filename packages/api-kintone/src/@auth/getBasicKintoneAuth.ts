

export const getBasicKintoneAuth = () => {
  const loginAuth = process.env.KT_LOGIN_AUTH;
  const decodedAuth = Buffer.from(loginAuth, 'base64').toString('ascii');
  const [username, password] = decodedAuth.split(':');
  console.log(username, password);
  return {
    username,
    password,
  };
};