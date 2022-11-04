import { KintoneRestAPIClient } from '@kintone/rest-api-client';
import { RecordClient } from '@kintone/rest-api-client/lib/client/RecordClient';

const oAuth = {
  accessToken: '',

  /** Time when accesstoken was generated, valid for 1 hr */
  at: null as null | Date,

  refreshToken: process.env.KT_REFRESH_TOKEN,
};

