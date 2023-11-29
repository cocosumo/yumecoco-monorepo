import { onIndexShow } from 'api-kintone';
import { isProd } from 'config';
import { onIndexShowHandler } from './eventHandlers/onIndexShowHandler';


(async () => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);
  kintone.events.on(onIndexShow, onIndexShowHandler);

})();
