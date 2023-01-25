

export interface URLParams {
  projId?: string
  projEstimateId?: string,
  custGroupId?: string,
  menuOpen?: number,
  invoiceId?: string,
  clearFields?: string,
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
  Object.keys(obj).forEach((key: keyof typeof obj) => (obj[key] === undefined || obj[key] === '' ) && delete obj[key]);
  return new URLSearchParams(obj as Record<string, string>).toString();
};

/** @deprecated in favor useURLParams */
export const getParam = (k: KeyOfUrlParams) => {
  const origParam = window.location.hash.substring(
    window.location.hash.indexOf('?') + 1,
  );

  return (new URLSearchParams(origParam)).get(k);
};

