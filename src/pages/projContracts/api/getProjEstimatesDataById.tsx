import { TypeOfForm } from '..';
import { APPIDS, KintoneRecord } from '../../../api/kintone';

export const fetchProjEstimatesById =  async (projId: string) => {
  if (!projId) throw new Error('Invalid project id.');

  const result = await KintoneRecord.getRecords({
    app: APPIDS.projectEstimate,
    query: `${((k: KeyOfProjEstimates)=>k)('projId')} = "${projId}"`,
  });

  return result.records as unknown as ProjectEstimates.SavedData[];
};

export const getProjEstimatesDataById = async (
  records: ProjectEstimates.SavedData[],
  projEstimatesId: string,
): Promise<Partial<TypeOfForm>> => {

  const selectedProjEstimate = records.find(({ $id }) => $id.value === projEstimatesId );

  if (!selectedProjEstimate) return {};

  const { envStatus, envDocFileKeys, envId } = selectedProjEstimate;

  return {
    envelopeId: envId.value,
    envelopeStatus: envStatus.value as TEnvelopeStatus,
    envDocFileKeys: envDocFileKeys.value,
    envSelectedDoc: envDocFileKeys.value[0]?.fileKey,
  };
};

/*

  envelopeId: envelopeId.value,
    envelopeStatus: envelopeStatus.value,
    envDocFileKeys: envDocFileKeys.value,
    envSelectedDoc: envDocFileKeys.value[0]?.fileKey,
*/