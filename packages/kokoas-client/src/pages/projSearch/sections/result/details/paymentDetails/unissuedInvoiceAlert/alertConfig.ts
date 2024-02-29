
export const alertPurposes = {
  'unissued': '請求書未発行(入金あり)',
  'subsidy': '補助金の請求書発行',
};

export type KAlertPurpose = keyof typeof alertPurposes;

type AlertMessages = {
  [Key in KAlertPurpose]: string;
};

export const alertMessages: AlertMessages = {
  'unissued': '顧客からの入金がありましたが、請求書が発行されていません。',
  'subsidy': '補助金の請求書が必要です。',
};


/**chatworkのルームID */
export const chatworkRooms = {
  cocoasGroup: '335602129',
  rpaChatGroup: '213232379',
  testRoom: '225800073',
  test: '335600969',
};
