import { useEffect, useState } from 'react';
import { initialValues } from '../form';
import { useURLParamsV2 } from 'kokoas-client/src/hooks/useURLParamsV2';
import { useAllEmployees, useContractsByProjIdV2, useCustGroupById, useProjById, useProjTypeById, useStoreById } from 'kokoas-client/src/hooksQuery';
import { convertProjToForm } from '../api/convertProjToForm';
import { convertCustGroupToForm } from '../api/convertCustGroupToForm';
import { TEnvelopeStatus } from 'types';
import { getPersistentFields } from '../api/getPersistentFields';

export const useResolveParams = () => {
  const [newFormVal, setNewFormVal] = useState(initialValues);

  const {
    projId: projIdFromURL,
    custGroupId: custGroupIdFromURL,
  } = useURLParamsV2();

  const { data: projRec } = useProjById(projIdFromURL || '');

  const { data: custGroupRec } = useCustGroupById(projRec?.custGroupId.value || custGroupIdFromURL || '');

  const { data: contracts } = useContractsByProjIdV2(projRec?.uuid.value);

  const { data: projTypeRec, isLoading: projTypeRecIsLoading } = useProjTypeById(projRec?.projTypeId.value || '');

  const { data: storeRec } = useStoreById(projRec?.storeId.value || custGroupRec?.storeId.value || '');

  const { data: employeeRecs } = useAllEmployees();


  const hasContract = !!contracts && contracts.some(({ envelopeStatus }) => envelopeStatus.value);

  const completed =  contracts && contracts
    ?.some((contract) => (contract.envelopeStatus.value as TEnvelopeStatus) === 'completed');

  useEffect(() => {
    // Prevent loading from overwriting form values
    if (projTypeRecIsLoading) return;

    if (projIdFromURL && projRec && custGroupRec && contracts && storeRec && employeeRecs) {

      const projData = convertProjToForm({
        hasContract,
        projRec,
        employeeRecs,
        custGroupRec,
      });

      const persistentData = getPersistentFields({
        projRec,
        projTypeRec,
        hasContract,
      });

      setNewFormVal({
        ...initialValues,
        hasContract: !!hasContract,
        hasCompletedContract: !!completed,
        ...projData,
        ...persistentData,
      });

    } else if (custGroupIdFromURL && !projIdFromURL && custGroupRec) {
      // 新規ですが、顧客グループIDがある場合
      setNewFormVal({
        ...initialValues,
        ...convertCustGroupToForm(
          custGroupRec, employeeRecs || [],
        ),
      });

    } else if (!custGroupIdFromURL && !projIdFromURL) {
      // 新規
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
    projTypeRec,
    projTypeRecIsLoading,
    storeRec,
    employeeRecs,
  ]);

  return { newFormVal };
};