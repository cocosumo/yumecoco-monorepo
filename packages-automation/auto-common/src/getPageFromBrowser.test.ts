import { describe, it } from '@jest/globals';
import { getPageFromBrowser } from './getPageFromBrowser';
import { connectToBrowser } from './connectToBrowser';
import { faker } from '@faker-js/faker';

describe('Get Page From Browser', () => {
  it('should get page from browser', async () => {
    const browser = await connectToBrowser();
    const page = await getPageFromBrowser(browser);

    // Navigate to random page to test if page is working.
    const url = `https://www.google.com?q=${faker.location.country()}`;

    console.log(`Navigating to ${url}`);

    await page.goto(url);

    browser.disconnect();
  }, 60000);
});