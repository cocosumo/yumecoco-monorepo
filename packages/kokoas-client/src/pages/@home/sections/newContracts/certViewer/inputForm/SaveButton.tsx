import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useTypedFormContext } from '../hooks/useTypedRHF';
import { IContracts } from 'types';
import { useSaveContract } from 'kokoas-client/src/hooksQuery';
import { useState } from 'react';
import { sleep } from 'libs';

export const SaveButton = () => {
  const [loadingSave, setLoadingSave] = useState(false); 

  const { 
    handleSubmit,
    formState,
  } = useTypedFormContext();

  const {
    isDirty,
    isSubmitting,
  } = formState;


  const { mutateAsync, isLoading  } = useSaveContract();

  const handleSave = handleSubmit(
    async (data) => {
      setLoadingSave(true);
      const {
        financingMethod,
        financialInstitution,
        branchName,
        tel,
        fax,
        contractId,
      } = data;
      const record: Partial<IContracts> = {
        financingMethod: { value: financingMethod },
        financialInstitution: { value: financialInstitution },
        financialInstitutionBranch: { value: branchName },
        financialContactTel: { value: tel },
        financialContactFax: { value: fax },
      };
      await mutateAsync({
        record,
        recordId: contractId,
      });
      await sleep(1000);
      setLoadingSave(false);
      
    },
    (err) => {
      console.warn(err);
    },
  );
  
  const isFormLoading = isLoading || isSubmitting || loadingSave;
  const isSaveDisabled = !isDirty || isFormLoading;

  return (
    <LoadingButton
      variant='outlined'
      color='success'
      loading={isLoading || isSubmitting}
      startIcon={<SaveIcon />}
      disabled={isSaveDisabled}
      onClick={handleSave}
      loadingPosition='start'
      sx={{
        alignSelf: 'flex-start',
      }}
    >
      保存
    </LoadingButton>
  );
};