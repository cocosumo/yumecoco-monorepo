import { onDetailShow, onEdit, onSubmitSuccess } from 'api-kintone';
import { isProd } from 'config';
import { onCreateOrEditSubmitHandler } from './eventHandlers/onCreateOrEditSubmitHandler';
import { onEditHandler } from './eventHandlers/onEditHandler';
import { onDetailShowHandler } from './eventHandlers/onDetailShowHandler';


(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);
  kintone.events.on(onSubmitSuccess, onCreateOrEditSubmitHandler);
  kintone.events.on(onDetailShow, onDetailShowHandler);
  kintone.events.on(onEdit, onEditHandler);
})();
