import { ktApp } from 'api-kintone';
import { KtAppParam } from 'types';

export const getFormFields = async (
  param: KtAppParam<'getFormFields'>,
) => (await ktApp()).getFormFields(param);