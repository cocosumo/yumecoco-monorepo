import { ktApp } from 'api-kintone';
import { KtAppParam } from 'types';

export type GetFormFieldsReturn = Awaited<ReturnType<typeof getFormFields>>;

/**
 * DBのフィールドを取得する
 * @see https://github.com/kintone/js-sdk/blob/master/packages/rest-api-client/docs/app.md#getformfields
 */
export const getFormFields = async (
  param: KtAppParam<'getFormFields'>,
) => (await ktApp()).getFormFields(param);