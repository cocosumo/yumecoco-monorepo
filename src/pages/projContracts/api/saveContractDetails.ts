import { APPIDS, KintoneRecord } from '../../../api/kintone';
import { TypeOfForm } from '../form';

export const saveContractDetails = async (form: TypeOfForm) => {
  const { projId, contractPrice } = form;

  if (!projId) throw new Error('Invalid project id.');

  const record: Partial<ProjectDetails.SavedData> = {
    contractPrice: { value: contractPrice.toString() },
  };

  const result = await KintoneRecord.updateRecord({
    app: APPIDS.constructionDetails,
    id: projId,
    record,
  });

  return result;
};