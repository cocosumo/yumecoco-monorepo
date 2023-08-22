
import { 
  onEditOrCreate, 
  onIndexShow, 
} from 'api-kintone';
import onIndexShowHandler from './handlers/onIndexShowHandler/onIndexShowHandler';


(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  //kintone.events.on(onEditOrCreateSubmit, onEditOrCreateSubmitHandler);
})();
