

import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import './app.css';

import { onIndexShow } from './helpers/kintone';
//import { addCustomers } from './api/kintone/customers/POST';


(async () => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  console.log(process.env.FUCK);
})();
