import { KProjestimates, TEnvelopeStatus } from 'types';
import { getRecords } from '../common';
import { calculateEstimateRecord, CalculateEstimateRecordReturn } from './calculation';
import { RecordType, appId } from './config';

type GetContractByProjIdResult =  {
  record: RecordType,
  calculated: CalculateEstimateRecordReturn
} | undefined;

/**
 * 主な契約（一番高い金額）を取得する
 */
export const getContractByProjId = async (projId: string) => {
  if (!projId) throw new Error('Invalid project id.');

  const projIdKey : KProjestimates  = 'projId';
  const envStatusKey : KProjestimates = 'envStatus';

  const envStatusVal : TEnvelopeStatus = 'completed';

  const mainQuery = [
    `${projIdKey} = "${projId}"`,
    `${envStatusKey} = "${envStatusVal}"`,
  ]
    .join(' and ');

  console.log(mainQuery);
  const result = getRecords<RecordType>({
    app: appId,
    query: `${mainQuery}`,
  })
    .then(({ records }) => {

      return records
        .reduce((mainContract, estimate) => {
          if (estimate.projId.value !== projId) {
            return mainContract;
          }

          const calculated = calculateEstimateRecord({ record: estimate });

          if (!mainContract || calculated.summary.totalAmountAfterTax > mainContract.calculated.summary.totalAmountAfterTax) {
            return {
              record: estimate,
              calculated,
            };
          }
          return mainContract;

        }, undefined as GetContractByProjIdResult);
    });


  return result;
};