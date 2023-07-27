import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import { useTypedFormContext } from '../hooks/useTypedRHF';
import { IContracts } from 'types';
import { useSaveContract } from 'kokoas-client/src/hooksQuery';
import { sleep } from 'libs';

export const SaveButton = () => {

  const { 
    handleSubmit,
    formState: {
      isDirty,
      isSubmitting,
      
    },
  } = useTypedFormContext();


  const { mutateAsync, isLoading  } = useSaveContract();

  const handleSave = handleSubmit(
    async (data) => {
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
      await sleep(2000); // throttle
      await mutateAsync({
        record,
        recordId: contractId,
      });
    },
    (err) => {
      console.warn(err);
    },
  );

  return (
    <LoadingButton
      variant='outlined'
      color='success'
      loading={isLoading || isSubmitting}
      startIcon={<SaveIcon />}
      disabled={!isDirty || isLoading || isSubmitting}
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