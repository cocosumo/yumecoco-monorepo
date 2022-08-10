import { APPIDS, KintoneRecord } from '../../../api/kintone';

export const getContractInfo = async (projId: string, custGroupId: string) => {
  const {
    members,
  } = await KintoneRecord.getRecord({
    app: APPIDS.custGroup,
    id: custGroupId,
  }).then(r => r.record as unknown as CustomerGroupTypes.SavedData);



};