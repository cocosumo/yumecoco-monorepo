/* import { RequestHandler } from 'express';
import { accessAPI } from '../../../../../packages-automation/auto-andpad/src/accessAPI/accessAPI';
import { getPageFromBrowser, headLessBrowser } from 'auto-common';

export const reqAndpadApi: RequestHandler = async (req, res) => {

  try {
    const browser = await headLessBrowser();
    const page = await getPageFromBrowser(browser);
    const result = await accessAPI(page,  'https://api.andpad.jp/manager/v2/orders/11999912/planned_budget/planned_budget_groups?=1691632726474');
    console.log(  req.query, result);

    res.json(result);
  } catch (e) {
    console.log(e.message);
  }

}; */