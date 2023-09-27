import { onDetailShow, onEdit, onFieldChange, onSubmitSuccess } from 'api-kintone';
import { isProd } from 'config';
import { onCreateOrEditSubmitHandler } from './eventHandlers/onCreateOrEditSubmitHandler';
import { onEditHandler } from './eventHandlers/onEditHandler';
import { onDetailShowHandler } from './eventHandlers/onDetailShowHandler';
import { KeyOfDB } from './config';
import { onChangeRDHandler } from './eventHandlers/onChangeRDHandler';


(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);
  kintone.events.on(onSubmitSuccess, onCreateOrEditSubmitHandler);
  kintone.events.on(onDetailShow, onDetailShowHandler);
  kintone.events.on(onEdit, onEditHandler);
  kintone.events.on(onFieldChange(['reminderDate'] as Array<KeyOfDB>), onChangeRDHandler);
})();
