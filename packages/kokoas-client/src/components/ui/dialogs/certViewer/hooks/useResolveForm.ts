import { useEffect, useState } from 'react';
import { initialForm } from '../form';
import { useContractById } from 'kokoas-client/src/hooksQuery';

export const useResolveForm = (contractId: string, enabled: boolean) => {
  const [newFormValues, setNewFormValues] = useState(initialForm);
  const { data, isLoading } = useContractById(contractId, {
    enabled,
  });


  useEffect(() => {
    if (data) {
      const {
        uuid,
        financingMethod,
        financialInstitution,
        financialContactFax,
        financialContactTel,
        financialInstitutionBranch,
      } = data;

      setNewFormValues({
        contractId: uuid.value,
        financingMethod: financingMethod.value,
        financialInstitution: financialInstitution.value,
        tel: financialContactTel.value,
        fax: financialContactFax.value,
        branchName: financialInstitutionBranch.value,
      });
    }

  }, 
  [
    data,
  ]);

  return {
    newFormValues,
    isLoading, 
  };

};