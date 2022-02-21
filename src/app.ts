

import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import './app.css';

import { onIndexShow } from './helpers/kintone';
import { getKintoneUserByEmpId } from './api/kintone/users/GET';

(async () => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  console.log(await getKintoneUserByEmpId('44'));
})();
