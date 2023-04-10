import { onIndexShow } from 'api-kintone';
import { isProd } from 'config';



(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);
  kintone.events.on(onIndexShow, () => {
    console.log('hello');
  });

})();