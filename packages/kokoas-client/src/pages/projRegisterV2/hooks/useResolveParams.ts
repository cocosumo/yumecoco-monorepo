import { useEffect, useState } from 'react';
import { initialValues } from '../form';
import { useURLParamsV2 } from 'kokoas-client/src/hooks/useURLParamsV2';
import { useContractsByProjIdV2, useCustGroupById, useProjById } from 'kokoas-client/src/hooksQuery';
import { convertProjToForm } from '../api/convertProjToForm';
import { convertCustGroupToForm } from '../api/convertCustGroupToForm';
import { TEnvelopeStatus } from 'types';

export const useResolveParams = () => {
  const [newFormVal, setNewFormVal] = useState(initialValues);

  const {
    projId: projIdFromURL,
    custGroupId: custGroupIdFromURL,
  } = useURLParamsV2();

  const { data: projRec } = useProjById(projIdFromURL || '');

  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value || custGroupIdFromURL || '');

  const { data: contracts } = useContractsByProjIdV2(projRec?.uuid.value);
  /* 
  const {
    completed,
    hasContract,
  } = contractSummary || {}; */

  const hasContract = contracts && contracts?.length > 0;
  const completed =  contracts && contracts
    ?.some((contract) => (contract.envelopeStatus.value as TEnvelopeStatus) === 'completed');

  useEffect(() => {

    if (projIdFromURL && projRec && custGroupRec && contracts) {

      const {
        cocoAG1,
        cocoAG2,
        yumeAG1,
        yumeAG2,
        ...restOfProjData
      } = convertProjToForm(projRec);

      const {
        cocoAG1: custCocoAG1,
        cocoAG2: custCocoAG2,
        yumeAG1: custYumeAG1,
        yumeAG2: custYumeAG2,
        ...restOfCustGroupData
      } = convertCustGroupToForm(custGroupRec);


      setNewFormVal({
        ...initialValues,
        hasContract: !!hasContract,
        hasCompletedContract: !!completed,

        ...restOfProjData,
        ...restOfCustGroupData,

        //　空の場合はcustGroupRecの値を入れる
        cocoAG1: custCocoAG1 || cocoAG1 || '',
        cocoAG2: custCocoAG2 || cocoAG2 || '',
        yumeAG1: custYumeAG1 || yumeAG1 || '',
        yumeAG2: custYumeAG2 || yumeAG2 || '',

      });

    } else if (custGroupIdFromURL && !projIdFromURL && custGroupRec) {
      setNewFormVal({
        ...initialValues,
        ...convertCustGroupToForm(custGroupRec),
      });

    } else if (!custGroupIdFromURL && !projIdFromURL) {
      setNewFormVal(initialValues);

    }
  }, [
    projRec, 
    custGroupRec, 
    projIdFromURL, 
    custGroupIdFromURL,
    hasContract,
    completed,
    contracts,
  ]);

  return { newFormVal };
};