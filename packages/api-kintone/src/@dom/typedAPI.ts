interface AppRecord {
  recordId: string,
  appId?: string,
  domain?: string | null
}

export const isMobile : boolean = (window.location.href).includes('k/m');

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

export const onEdit = [
  'app.record.edit.show',
  'mobile.app.record.edit.show',
] as const;

export const onCreate = [
  'app.record.create.show',
  'mobile.app.record.create.show',
] as const;

export const onEditSubmit = [
  'app.record.edit.submit',
  'mobile.app.record.edit.submit',
] as const;

export const onEditSubmitSuccess = [
  'app.record.edit.submit.success',
  'mobile.app.record.edit.submit.success',
] as const;

export const onCreateSubmit = [
  'app.record.create.submit',
  'mobile.app.record.create.submit',
] as const;

export const onCreateSubmitSuccess : string[] = [
  'app.record.create.submit.success',
  'mobile.app.record.create.submit.success',
];

export const onIndexShow : string[] = [
  'app.record.index.show',
  'mobile.app.record.index.show',
];

export const onReportShow : string[] = [
  'app.report.show',
  'mobile.app.report.show',
];


export const onEditOrCreate = onEdit.concat(onCreate);
export const onSubmit = onEditSubmit.concat(onCreateSubmit);

export const onSubmitSuccess = onEditSubmitSuccess.concat(onCreateSubmitSuccess);

export const onFieldChange = (fields : string | string[]) : string[] =>
  ([] as string[]).concat(fields).reduce(
    (acc : string[], curr) : string[] => {
      return acc.concat(
        `app.record.edit.change.${curr}`,
        `mobile.app.record.edit.change.${curr}`,
        `app.record.create.change.${curr}`,
        `mobile.app.record.create.change.${curr}`,
      );
    }, [],
  );

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
