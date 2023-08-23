import { ApiNodes } from 'types';
import { apiKey, baseUrl } from '../config';
import { kintoneProxyWrapper, sendGridEndpoints } from 'libs';
import { generateHTMLNotification } from '../helpers/generateHTMLNotifcation';


export const sendEmail = async (event : { 
  record: DB.SavedRecord,
  type: string, 
}) => {
  const {
    record,
    type,
  } = event;
  const {
    $revision,
    reservingPerson,
  } = record;

  const isNew = type.includes('create');
  const apiRoot: ApiNodes = 'sendgrid';

  if (!apiKey) throw new Error('API_KEY is not defined');

  const endpoint = [
    baseUrl,
    apiRoot,
    sendGridEndpoints.sendEmail,
  ].join('/');

  console.log('endpoint', endpoint);

  const result = await kintoneProxyWrapper({
    method: 'POST',
    url: endpoint,
    data: {
      'to': {
        'name': 'Test ',
        'email': 'cocosumo.rpa03@gmail.com',
      },
      'from': 'system@cocosumo.co.jp',
      'subject': `社有車予約のお知らせ : ${reservingPerson.value} - ${isNew ? '新規' : `編集(${$revision.value})`}`,
      //'text': '$id',
      'html': generateHTMLNotification(event),
    },
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
    },
  }).catch((error) => {
    console.error(error);
  });

  return result;
  

};