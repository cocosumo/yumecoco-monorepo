import { baseUrl } from 'config';
import { ApiNodes } from 'types';

const apiRoot : ApiNodes = 'openai';

export const openAIBaseUrl = [
  baseUrl,
  apiRoot,
].join('/');