import { APPIDS, KintoneRecord } from '../../../../api/kintone';
import { TypeOfForm } from '../form';

export const fetchRecord = async (recordId: string) => {
  return KintoneRecord.getRecord({
    app: APPIDS.constructionDetails,
    id: recordId,
  }).then(r => r.record as unknown as TypeOfProjectDetails);
};

export const getFormDataById = async (recordId: string) => {

  const {
    constructionName,
    envelopeId,
    envelopeStatus,
    documents,
  } = await fetchRecord(recordId);

  console.log('PROJNAME', constructionName.value);

  return {
    projId: recordId,
    projName: constructionName.value,
    envelopeId: envelopeId.value,
    envelopeStatus: envelopeStatus.value,
    documents: documents.value.map(e => e.fileKey),
  } as TypeOfForm;

};