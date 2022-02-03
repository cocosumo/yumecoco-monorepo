// import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import './app.css';

import { onIndexShow } from './helpers/kintone';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
})();
