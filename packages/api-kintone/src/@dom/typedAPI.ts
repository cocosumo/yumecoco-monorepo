interface AppRecord {
  recordId: string,
  appId?: string,
  domain?: string | null
}



export const isMobile = () => (window?.location.href || '').includes('k/m') ;

export const getAppId = () : number | null => {
  const url = window?.location.href;
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
  const nDomain = domain ? domain : window.location.origin;
  const nDevice = isMobile() ? 'k/m' : 'k';
  const nrecord = recordId
    ? `show${isMobile() ? '?' : '#'}record=${recordId}`
    : '';

  return `${nDomain}/${nDevice}/${appId}/${nrecord}`;

};

export const goToRecordPath = (recordDetails : AppRecord) => {
  window?.open(getRecordPath(recordDetails), '_blank')?.focus();
};


export const getPortalSpaceElement = () => (
  isMobile()
    ? kintone.mobile.portal.getContentSpaceElement()
    : kintone.portal.getContentSpaceElement()
);


/**
* 要素を表示・非表示
* @param fieldCode {string} 要素のフィールドコード
* @param isShown {boolean} trueは表示、falseは非表示
*/
export const setFieldShown = (fieldCode : string, isShown : boolean) => {
  if (isMobile()) {
    kintone.mobile.app.record.setFieldShown(fieldCode, isShown);
  } else {
    kintone.app.record.setFieldShown(fieldCode, isShown);
  }
};

/**
 * レコードのインスタンスの値を取得する
 * @see https://kintone.dev/en/docs/kintone/js-api/get-data/get-record/#get-record-details
 **/
export const getRecordInstance = () => {
  if (isMobile()) {
    return kintone.mobile.app.record.get();
  } else {
    return kintone.app.record.get();
  }
};


/**
 * フィールドの値をセットする
 * @param fieldCode 
 * @param value 
 * @see https://kintone.dev/en/docs/kintone/js-api/get-data/get-record/#set-record-value
 */
export const setFieldValue = (fieldCode : string, value : string) => {
  const recordInstance = getRecordInstance();

  recordInstance.record[fieldCode].value = value;

  if (isMobile()) {
    kintone.mobile.app.record.set(recordInstance);
  } else {
    kintone.app.record.set(recordInstance);
  }
};
