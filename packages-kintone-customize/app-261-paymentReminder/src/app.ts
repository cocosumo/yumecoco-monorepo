import { onDetailShow, onEditOrCreate, onFieldChange } from 'api-kintone';
import { isProd } from 'config';
import { onDetailShowHandler } from './eventHandlers/onDetailShowHandler';
import { KeyOfDB } from './types/types';
import { onChangeRDHandler } from './eventHandlers/onChangeRDHandler';
import { onEditOrCreateHandler } from './eventHandlers/onEditOrCreateHandler';


(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);
  kintone.events.on(onDetailShow, onDetailShowHandler);
  kintone.events.on(onEditOrCreate, onEditOrCreateHandler);
  kintone.events.on(onFieldChange(['reminderDate'] as Array<KeyOfDB>), onChangeRDHandler);
})();
