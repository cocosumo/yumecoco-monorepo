
import { 
  onEditOrCreate, 
  onIndexShow,
  onSubmit,
} from 'api-kintone';
import onIndexShowHandler from './handlers/onIndexShowHandler/onIndexShowHandler';
import onEditOrCreateHandler from './handlers/onEditOrCreateHandler/onEditOrCreateHandler';
import { onSubmitHandler } from './handlers/onSubmitHandler/onSubmitHandler';


(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  kintone.events.on(onSubmit, onSubmitHandler);
})();
