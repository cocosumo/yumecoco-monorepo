import { describe, it } from '@jest/globals';
import { getPageFromBrowser } from './getPageFromBrowser';
import { openMockBrowser } from './openMockBrowser';
import { faker } from '@faker-js/faker';

describe('Get Page From Browser', () => {
  it('should get page from browser', async () => {
    const browser = await openMockBrowser();
    const page = await getPageFromBrowser(browser);

    // Navigate to random page to test if page is working.
    const url = `https://www.google.com?q=${faker.location.country()}`;

    console.log(`Navigating to ${url}`);

    await page.goto(url);

    browser.disconnect();
  }, 60000);
});