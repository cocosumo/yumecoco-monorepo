
import onIndexShowHandler from './kintoneHandlers/onIndexShowHandler';
/* import onCreateHandler from './kintoneHandlers/onCreateHandler';
import onEditOrCreateSubmitHandler from './kintoneHandlers/eventHandlers/onEditOrCreateSubmitHandler';
import onEditOrCreateHandler from './kintoneHandlers/onEditOrCreateHandler';
import onTypeChangeHandler from './kintoneHandlers/eventHandlers/onTypeChangeHandler';
import onEditSubmitHandler from './kintoneHandlers/eventHandlers/onEditSubmitHandler'; */
import { 
  //onCreate, 
  //onEditOrCreate, 
  //onEditSubmitSuccess,
  //onFieldChange, 
  onIndexShow, 
  //onSubmit, 
} from 'api-kintone';

(() => {
  kintone.events.on(onIndexShow, onIndexShowHandler);
/*   kintone.events.on(onCreate, onCreateHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  kintone.events.on(onSubmit, onEditOrCreateSubmitHandler);
  kintone.events.on(onEditSubmitSuccess, onEditSubmitHandler);
  kintone.events.on(onFieldChange('type'), onTypeChangeHandler); */
})();
