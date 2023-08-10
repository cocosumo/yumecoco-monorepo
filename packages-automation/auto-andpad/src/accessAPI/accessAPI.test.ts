import { describe, it } from '@jest/globals';
import { accessAPI } from './accessAPI';
import { 
  getPageFromBrowser, 
  //headFullBrowser, 
  headLessBrowser, 
} from 'auto-common';

describe('accessAPI', () => {
  it('should access to andpad API', async () => {
    const browser = await headLessBrowser();
    //const browser = await headFullBrowser();
    try {

      const page = await getPageFromBrowser(browser);

      const result = await accessAPI(page, 'https://api.andpad.jp/manager/v2/orders/11999912/planned_budget/planned_budget_groups' );

      //await sleep(60000);

      console.log('results', JSON.stringify(result, null, 2));


    } catch (e) {
      console.error(e);
    } finally {
        
      // cleanup
      await browser.close();
    }

  }, 60000);
});