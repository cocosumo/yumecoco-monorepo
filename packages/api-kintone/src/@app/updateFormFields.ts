import { KtAppParam } from 'types';
import { ktApp } from '../client';

export const updateFormFields = async (
  params: KtAppParam<'updateFormFields'>,
) => (await ktApp()).updateFormFields(params);