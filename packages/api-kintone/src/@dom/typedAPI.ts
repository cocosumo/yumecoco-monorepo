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
  }: AppRecord,
) : string => {
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

export const getHeaderSpaceElement = () => (
  isMobile()
    ? kintone.mobile.app.getHeaderSpaceElement()
    : kintone.app.record.getHeaderMenuSpaceElement()
);


export const getSpaceElement = (spaceId: string) => (
  isMobile()
    ? kintone.mobile.app.record.getSpaceElement(spaceId)
    : kintone.app.record.getSpaceElement(spaceId));

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
 * 
 * 現状kintoneの型定義で、以下のissueで解消されるかもしれませんが、３年近くでまだオープン。
 * @see https://github.com/kintone/js-sdk/issues/445
 */
export const setFieldValue = <T extends string>(fieldCode : T, value : string) => {
  const recordInstance = getRecordInstance();

  recordInstance.record[fieldCode].value = value;
  recordInstance.record[fieldCode].lookup = true;

  if (isMobile()) {
    kintone.mobile.app.record.set(recordInstance);
  } else {
    kintone.app.record.set(recordInstance);
  }
};
