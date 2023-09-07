import { 
  onEditOrCreate,
} from 'api-kintone';
import { isProd } from 'config';
import customizeFields from './view/customizeFields';

import './../jsedit/fee-pullDown';
import './../jsedit/yumetetsu_syokairyou.css';



(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);

  kintone.events.on(onEditOrCreate, customizeFields);

  
})();