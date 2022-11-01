import { APPIDS, KintoneRecord } from '../../../api/kintone';

export const getCustGroupById = async (custGroupId?: string) => {
  try {
    if (!custGroupId) throw new Error(`CustGroupId ${custGroupId} not defined`);
    const { record } = await KintoneRecord.getRecord({
      app: APPIDS.custGroup,
      id: custGroupId,
    });
    return record as unknown as TypeOfCustomerGroup;
  } catch (err) {
    throw new Error(err.message);
  }
};