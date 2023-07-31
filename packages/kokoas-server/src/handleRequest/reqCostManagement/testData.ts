import { getAndpadOrdersByAndpadProjId } from 'api-kintone/src/andpadOrders/getAndpadOrdersByAndpadProjId';


export const testData:Awaited<ReturnType<typeof getAndpadOrdersByAndpadProjId>> = [
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '25000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'AAA建築' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '220000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'BBB' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '60000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'CCC' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '8500' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'クレームボックス' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '101000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: '株式会社AAA' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '87100' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'SSS株式会社' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '33000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'DDD設備' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '35000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'FFF' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '73000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'MMM電気' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '72000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: '㈱EEE' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '230480' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: '株式会社III' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '217010' },
    '支払日': { type: 'DATE', value: '' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: '株式会社HHH' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '86000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: '株式会社AAA' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '0' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: '株式会社RRR' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '162000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: '株式会社GGG' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '63000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'MMM電気' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
  {
    orderAmountBeforeTax: { type: 'NUMBER', value: '248000' },
    '支払日': { type: 'DATE', value: '2023-08-31' },
    supplierName: { type: 'SINGLE_LINE_TEXT', value: 'CCC株式会社' },
    orderType: { type: 'SINGLE_LINE_TEXT', value: '' },
    note: { type: 'SINGLE_LINE_TEXT', value: '' },
    'レコード番号': { type: 'RECORD_NUMBER', value: '' },
    supplierId: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderId: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_工事': { type: 'SINGLE_LINE_TEXT', value: '' },
    '更新者': { type: 'MODIFIER', value:  { code: '', name: '' }  },
    projType: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    orderStatus: { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_設計': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_業務': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderAmountAfterTax: { type: 'NUMBER', value: '' },
    deletedState: { type: 'SINGLE_LINE_TEXT', value: '-' },
    orderTaxAmount: { type: 'NUMBER', value: '' },
    '役割_IC': { type: 'SINGLE_LINE_TEXT', value: '' },
    orderName: { type: 'SINGLE_LINE_TEXT', value: '' },
    andpadProjId: { type: 'SINGLE_LINE_TEXT', value: '' },
    propertyAddress: { type: 'SINGLE_LINE_TEXT', value: '' },
    projName: { type: 'SINGLE_LINE_TEXT', value: '' },
    'メンバーラベル': { type: 'SINGLE_LINE_TEXT', value: '' },
    '作成者': { type: 'CREATOR', value:  { code: '', name: '' }  },
    '支払条件_手形': { type: 'NUMBER', value: '0' },
    tax: { type: 'NUMBER', value: '10' },
    '着工日': { type: 'DATE', value: '' },
    '$revision': { type: '__REVISION__', value: '1' },
    '支払条件_振込': { type: 'NUMBER', value: '' },
    '更新日時': { type: 'UPDATED_TIME', value: '' },
    orderDetails: { type: 'SINGLE_LINE_TEXT', value: '' },
    '納品日': { type: 'DATE', value: '' },
    '主担当者': { type: 'SINGLE_LINE_TEXT', value: '' },
    '役割_営業': { type: 'SINGLE_LINE_TEXT', value: '' },
    supplierManagementId: { type: 'SINGLE_LINE_TEXT', value: '' },
    contractNum: { type: 'SINGLE_LINE_TEXT', value: '' },
    '締め日': { type: 'DATE', value: '' },
    orderDate: { type: 'DATE', value: '' },
    '作成日時': { type: 'CREATED_TIME', value: '' },
    andpadManagementProjId: {
      type: 'SINGLE_LINE_TEXT',
      value: '',
    },
    '$id': { type: '__ID__', value: '' },
  },
];
