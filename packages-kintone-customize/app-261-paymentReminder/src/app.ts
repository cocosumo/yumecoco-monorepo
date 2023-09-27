import { onCreateSubmitSuccess, onFieldChange, onIndexShow, onSubmitSuccess } from 'api-kintone';
import { isProd } from 'config';
import { KeyOfDB } from './config';
import { onIndexShowHandler } from './eventHandlers/onIndexShowHandler';
import { onCreateOrEditSubmitHandler } from './eventHandlers/onCreateOrEditSubmitHandler';
import { onChangeRDHandler } from './eventHandlers/onChangeRDHandler';
import { onCreateSubmitSuccessHandler } from './eventHandlers/onCreateSubmitSuccessHandler';


(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onSubmitSuccess, onCreateOrEditSubmitHandler);
  kintone.events.on(onFieldChange(['reminderDate'] as Array<KeyOfDB>), onChangeRDHandler);
  kintone.events.on(onCreateSubmitSuccess, onCreateSubmitSuccessHandler);
})();
