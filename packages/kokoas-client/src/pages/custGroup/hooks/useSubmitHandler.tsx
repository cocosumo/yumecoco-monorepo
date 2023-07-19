import { useSnackBar } from 'kokoas-client/src/hooks';
import { useNavigate } from 'react-router-dom';
import { useTypedFormContext } from './useTypedHooks';
import { useSaveCustGroup } from 'kokoas-client/src/hooksQuery';
import { KForm } from '../schema';
import { formToDBCustomers } from '../api/formToDBCustomers';
import { formToDBCustGroup } from '../api/formToDBCustGroup';

export const useSubmitHandler = () => {
  const { setSnackState } = useSnackBar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    getValues,
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

      console.log('save!', newCustGroupId);
    },

    (errors) => {
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