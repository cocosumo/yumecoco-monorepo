import { useNavigateWithQuery, useSnackBar } from 'kokoas-client/src/hooks';
import { useTypedFormContext } from './useTypedHooks';
import { useSaveCustGroup } from 'kokoas-client/src/hooksQuery';
import { formToDBCustomers } from '../api/formToDBCustomers';
import { formToDBCustGroup } from '../api/formToDBCustGroup';

export const useSubmitHandler = () => {
  const { setSnackState } = useSnackBar();
  const navigate = useNavigateWithQuery();

  const {
    handleSubmit,
  } = useTypedFormContext();

  const { mutateAsync: saveCustGroupMutation } = useSaveCustGroup();

  const handleSave = handleSubmit(
    async (data) => {
      const {
        custGroupId,
      } = data;
      const customerRecords = formToDBCustomers(data);
      const custGroupRecord = formToDBCustGroup(data);

      const { id: newCustGroupId } = await saveCustGroupMutation({
        custGroupId: custGroupId,
        record: custGroupRecord,
        customerRecords,
      });

      navigate(
        'custGroupEditV2', 
        {
          custGroupId: newCustGroupId,
        },
      );
    },

    (errors) => {
      // eslint-disable-next-line no-console
      console.warn(errors); // 保存できない原因で、残す
      setSnackState({
        open: true,
        message: 'フォームに不備があります。 修正が出来ない場合はお手数ですが、管理者に連絡してください。', 
        severity: 'error',
        
      });
    },
  );

  return {
    handleSave,
  };
};