import { CarbonCopy } from 'docusign-esign';
import { TContractData } from '../getContractDataV2';
import { roles } from 'types';

export const commonCC = (data: TContractData) => {

  const {
    mainAccountingEmail,
    mainAccountingName,

    subAccountingEmail,
    subAccountingName,

    accountingEmail,
    accountingName,

    //territory,
  } = data;

  const ccs : CarbonCopy[] = [];

  /* 本社経理 */
  ccs.push({
    email: mainAccountingEmail,
    name: mainAccountingName,
    roleName: roles.main,
    recipientId: '4',
    routingOrder: '4',
  });

  // 経理(最終確認者）
  ccs.push({
    email: subAccountingEmail,
    name: subAccountingName,
    roleName: roles.accounting,
    recipientId: '44',
    routingOrder: '4',
  });

  // 依頼番号：K118 -> k336
  if (subAccountingName !== accountingName) {
    ccs.push({
      email: accountingEmail,
      name: accountingName,
      roleName: roles.accounting,
      recipientId: '444',
      routingOrder: '4',
    });
  }

  
  return ccs;
};