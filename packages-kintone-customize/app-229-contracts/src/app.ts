import { 
  onEditOrCreate,
  onIndexShow,
} from 'api-kintone';
import { isProd } from 'config';
import customizeFields from './view/customizeFields';

import './../jsedit/fee-pullDown';
import { indexShow } from './view/indexShow/indexShow';


(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);

  kintone.events.on(onEditOrCreate, customizeFields);

  
  kintone.events.on(onIndexShow, indexShow);


})();