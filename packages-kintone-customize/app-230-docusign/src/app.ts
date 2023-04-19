import { 
  onEditOrCreate,
} from 'api-kintone';
import customizeFields from './view/customizeFields';



(() => {
  // 環境変数の確認
  // eslint-disable-next-line no-console
  console.log('環境', import.meta.env.MODE);
  
  kintone.events.on(onEditOrCreate, customizeFields);
})();