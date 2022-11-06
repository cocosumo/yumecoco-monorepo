
import { URLParams } from 'types';

export const getUrlParams = (): URLParams => {
  const origParam = window.location.hash.substring(
    window.location.hash.indexOf('?') + 1,
  );

  return  Object.fromEntries(new URLSearchParams(origParam)) as URLParams;
};