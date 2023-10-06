import { useEffect, useState } from 'react';
import { initialValues } from '../form';
import { useURLParamsV2 } from 'kokoas-client/src/hooks/useURLParamsV2';
import { useAllEmployees, useContractsByProjIdV2, useCustGroupById, useProjById, useProjTypeById, useStoreById } from 'kokoas-client/src/hooksQuery';
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

      const {
        cocoAG1,
        cocoAG2,
        yumeAG1,
        yumeAG2,

        // 店舗情報
        storeId,
        storeCode,
        storeName,
        territory,
        ...restOfProjData
      } = convertProjToForm({
        hasContract,
        projRec,
        projTypeRec,
        employeeRecs,
      });

      const {
        cocoAG1: custCocoAG1,
        cocoAG2: custCocoAG2,
        yumeAG1: custYumeAG1,
        yumeAG2: custYumeAG2,
        storeId: custStoreId,
        storeCode: custStoreCode,
        storeName: custStoreName,
        territory: custTerritory,
        ...restOfCustGroupData
      } = convertCustGroupToForm(custGroupRec);


      setNewFormVal({
        ...initialValues,
        hasContract: !!hasContract,
        hasCompletedContract: !!completed,

        ...restOfProjData,
        ...restOfCustGroupData,

        //　空の場合はcustGroupRecの値を入れる
        cocoAG1: cocoAG1 || custCocoAG1 || '',

        cocoAG2: cocoAG2 || custCocoAG2 || '',
        yumeAG1: yumeAG1 || custYumeAG1 || '',
        yumeAG2: yumeAG2 || custYumeAG2 || '',

        // 店舗情報
        storeId: storeId || custStoreId || storeRec.uuid.value || '',
        storeCode: storeCode || custStoreCode || storeRec.storeCode.value || '',
        storeName: storeName || custStoreName || storeRec.店舗名.value || '',
        territory: territory || custTerritory || storeRec.area.value || '',

      });

    } else if (custGroupIdFromURL && !projIdFromURL && custGroupRec) {
      // 新規ですが、顧客グループIDがある場合
      setNewFormVal({
        ...initialValues,
        ...convertCustGroupToForm(custGroupRec),
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