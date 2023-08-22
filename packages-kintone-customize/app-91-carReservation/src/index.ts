
import { 
  onEditOrCreate, 
  onIndexShow,
  onSubmitSuccess, 
} from 'api-kintone';
import onIndexShowHandler from './handlers/onIndexShowHandler/onIndexShowHandler';
import onEditOrCreateHandler from './handlers/onIndexShowHandler/onEditOrCreateHandler/onEditOrCreateHandler';


(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  kintone.events.on(onSubmitSuccess, onEditOrCreateSubmitHandler);
})();
