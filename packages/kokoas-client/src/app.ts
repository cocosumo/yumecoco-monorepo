

import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import './app.css';

import { onIndexShow } from './helpers/kintone';


(async () => {
  kintone.events.on(onIndexShow, onIndexShowHandler);

})();


