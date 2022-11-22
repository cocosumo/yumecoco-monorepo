import { ktApp } from 'api-kintone';
import { KtAppParam } from 'types';

export const getApp = async (
  param: KtAppParam<'getApp'>,
) => (await ktApp()).getApp(param);