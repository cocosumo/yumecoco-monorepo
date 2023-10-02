import { onDetailShow, onEdit, onFieldChange } from 'api-kintone';
import { isProd } from 'config';
import { onEditHandler } from './eventHandlers/onEditHandler';
import { onDetailShowHandler } from './eventHandlers/onDetailShowHandler';
import { KeyOfDB } from './types/types';
import { onChangeRDHandler } from './eventHandlers/onChangeRDHandler';


(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);
  kintone.events.on(onDetailShow, onDetailShowHandler);
  kintone.events.on(onEdit, onEditHandler);
  kintone.events.on(onFieldChange(['reminderDate'] as Array<KeyOfDB>), onChangeRDHandler);
})();
