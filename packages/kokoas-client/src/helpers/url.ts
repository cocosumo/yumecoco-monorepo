/* eslint-disable no-param-reassign */


export interface URLParams {
  projId?: string | null,
  projEstimateId?: string | null,
  custGroupId?: string | null,
  menuOpen?: number | null,
  invoiceId?: string | null,
  clearFields?: string | null,
  contractId?: string | null,
  revision?: number | string | null,
}


type KeyOfUrlParams = keyof URLParams;


export const getParams = () => {
  const origParam = window.location.hash.substring(
    window.location.hash.indexOf('?') + 1,
  );

  return  Object.fromEntries(new URLSearchParams(origParam));
};

export const generateParams = (obj: URLParams) => {
  // Remove undefined
  Object.keys(obj).forEach((key: keyof typeof obj) => (obj[key] === undefined || obj[key] === null || obj[key] === '' ) && delete obj[key]);
  return new URLSearchParams(obj as Record<string, string>).toString();
};

/** @deprecated in favor useURLParams */
export const getParam = (k: KeyOfUrlParams) => {
  const origParam = window.location.hash.substring(
    window.location.hash.indexOf('?') + 1,
  );

  return (new URLSearchParams(origParam)).get(k);
};

