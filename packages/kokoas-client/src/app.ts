

import onIndexShowHandler from './pageShowHandlers/onIndexShowHandler';
import './app.css';

import { onIndexShow } from './helpers/kintone';
import { isProd } from 'config';


(async () => {
  console.log('Running in ', isProd ? 'production' : 'development');
  kintone.events.on(onIndexShow, onIndexShowHandler);

})();


