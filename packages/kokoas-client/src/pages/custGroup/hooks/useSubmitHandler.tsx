import { useConfirmDialog, useNavigateWithQuery, useSnackBar } from 'kokoas-client/src/hooks';
import { useTypedFormContext } from './useTypedHooks';
import { useAllEmployees, useSaveCustGroup, useSaveCustomers } from 'kokoas-client/src/hooksQuery';
import { formToDBCustomers } from '../api/formToDBCustomers';
import { formToDBCustGroup } from '../api/formToDBCustGroup';

export const useSubmitHandler = () => {
  const { setSnackState } = useSnackBar();
  const { setDialogState } = useConfirmDialog();
  const navigate = useNavigateWithQuery();

  const {
    handleSubmit,
  } = useTypedFormContext();

  const { mutateAsync: saveCustGroupMutation } = useSaveCustGroup();
  const { mutateAsync: saveCustomersMutation } = useSaveCustomers();
  const { data: employees } = useAllEmployees();

  const handleSave = handleSubmit(
    async (data) => {
      const {
        custGroupId,
      } = data;
      const customerRecords = formToDBCustomers(data);
      const savedCustomers = await saveCustomersMutation({ records: customerRecords });

      const custGroupRecord = formToDBCustGroup({
        formData:data, 
        employees: employees || [],
        savedCustomers: savedCustomers,
      });

      const {
        id,
      } = await saveCustGroupMutation({
        custGroupId: custGroupId,
        record: custGroupRecord,
      });

      //if (!custGroupId) {
      setDialogState({
        title: '次へ進む',
        content: '工事情報を登録しますか。',
        handleYes: ()=>navigate('projEditV2', {
          custGroupId: id,
        }),
        handleNo: ()=>navigate('custGroupEditV2', {
          custGroupId: id,
        }),
      });
      
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