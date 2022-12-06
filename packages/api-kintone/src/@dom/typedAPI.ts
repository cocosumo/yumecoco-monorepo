interface AppRecord {
  recordId: string,
  appId?: string,
  domain?: string | null
}



export const isMobile : boolean = typeof window !== 'undefined' ? (window.location.href || '').includes('k/m') : false;

export const getAppId = () : number | null => {
  const url = window.location.href;
  return url.includes('k/m')
    ? kintone.mobile.app.getId()
    : kintone.app.getId();
};

export const getRecordPath = (
  {
    recordId,
    appId,
    domain,
  }: AppRecord) : string => {
  const nDomain = domain ? domain : window.location.href;
  const nDevice = isMobile ? 'k/m' : 'k';
  const nrecord = recordId
    ? `show${isMobile ? '?' : '#'}record=${recordId}`
    : '';

  return `https://${nDomain}/${nDevice}/${appId}/${nrecord}`;

};

export const goToRecordPath = (recordDetails : AppRecord) => {
  window?.open(getRecordPath(recordDetails), '_blank')?.focus();
};


export const getPortalSpaceElement = () => (
  isMobile
    ? kintone.mobile.portal.getContentSpaceElement()
    : kintone.portal.getContentSpaceElement()
);


/**
* 要素を表示・非表示
* @param fieldCode {string} 要素のフィールドコード
* @param isShown {boolean} trueは表示、falseは非表示
*/
export const setFieldShown = (fieldCode : string, isShown : boolean) => {
  if (isMobile) {
    kintone.mobile.app.record.setFieldShown(fieldCode, isShown);
  } else {
    kintone.app.record.setFieldShown(fieldCode, isShown);
  }
};
