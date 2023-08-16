import { Page } from 'puppeteer';

import { setCookie } from '../helpers/setCookie';

export const accessAPI = async (
  page: Page, 
  andpadEndpoint: string,
) => {

  await setCookie(page);

  // We need to trick the server to think that we are not a bot, so we are using a real browser
  // However, some endpoints are not accessible from the browser with a different origin
  // so we need to use the API directly on the page, then fetch the data from the browser
  await page.goto(andpadEndpoint);

  const isFailedLogin = (await page.content()).includes('"code":401');
  if (isFailedLogin) {
    console.log('Failed login, retrying...');
    await setCookie(page, true);
    await page.goto(andpadEndpoint);

  }

  const result = await page.evaluate(async (endpoint) => {
    return fetch(endpoint, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((json) => {
        return json;
      });

  }, andpadEndpoint);

  return result;
};