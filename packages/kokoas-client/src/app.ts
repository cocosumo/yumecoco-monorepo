/* eslint-disable no-console */


import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import './app.css';

import { onIndexShow } from './helpers/kintone';
import { isProd } from 'config';
import packageInfo from './lib/packageInfo';


(async () => {
  console.log(`Running in ${isProd ? 'production' : 'development'} ${packageInfo.version}`);
  kintone.events.on(onIndexShow, onIndexShowHandler);

})();


