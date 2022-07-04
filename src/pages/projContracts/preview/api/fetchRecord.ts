import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { TypeOfForm } from '../form';

export const fetchRecord = async (recordId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
  }).then(r => r.record as unknown as TypeOfProjectDetails);
};

export const getFormDataById = async (recordId: string): Promise<TypeOfForm> => {

  const {
    dsEnvIdUkeoi,
    constructionName,
  } = await fetchRecord(recordId);

  return {
    projId: recordId,
    projName: constructionName.value,
    dsEnvIdUkeoi: dsEnvIdUkeoi.value,
  };

};