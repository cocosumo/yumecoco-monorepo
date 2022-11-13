import { getKokoasBaseURLByEnv } from 'kokoas-client/src/config/settings';
import { pages } from 'kokoas-client/src/pages/Router';

describe('customers', () => {
  const baseUrl = getKokoasBaseURLByEnv() + pages.custGroupReg;
  let page: Page;


  it('should retrieve url', async () => {

  });
});