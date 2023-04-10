import { 
  onEditOrCreate,
} from 'api-kintone';
import { isProd } from 'config';
import customizeFields from './view/customizeFields';



(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);

  kintone.events.on(onEditOrCreate, customizeFields);
})();