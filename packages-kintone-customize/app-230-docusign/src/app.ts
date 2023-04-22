import { 
  onDetailShow,
  onEditOrCreate,
} from 'api-kintone';
import customizeFields from './view/customizeFields';
import { serverlUrl } from '../config';
import customizeDetails from './view/customizeDetails';



(() => {
  // 環境変数の確認
  // eslint-disable-next-line no-console
  console.log('環境', serverlUrl);
  
  kintone.events.on(onEditOrCreate, customizeFields);
  kintone.events.on(onDetailShow, customizeDetails);
})();