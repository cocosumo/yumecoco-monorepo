import {
  onCreateSubmitSuccess,
  onIndexShow,
  onSubmitSuccess,
  onFieldChange,
} from 'api-kintone';
import { isProd } from 'config';

import  {
  onCreateOrEditSubmitHandler,
  onIndexShowHandler,
  onEditOrCreateSubmitSuccessHandler,
  onChangeAGHandler,
} from './eventHandlers';
import { KeyOfDB } from './types';


(() => {
  console.log(`Running in ${isProd ? 'production' : 'development'}`);
  kintone.events.on(onIndexShow, onIndexShowHandler);
  kintone.events.on(onSubmitSuccess, onCreateOrEditSubmitHandler);
  kintone.events.on(onFieldChange(['担当者'] as Array<KeyOfDB>), onChangeAGHandler);
  kintone.events.on(onCreateSubmitSuccess, onEditOrCreateSubmitSuccessHandler);
})();
