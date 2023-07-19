import { useSnackBar } from 'kokoas-client/src/hooks';
import { useNavigate } from 'react-router-dom';
import { useTypedFormContext } from './useTypedHooks';
import { useSaveCustGroup } from 'kokoas-client/src/hooksQuery';
import { KForm } from '../schema';

export const useSubmitHandler = () => {
  const { setSnackState } = useSnackBar();
  const navigate = useNavigate();
  const {
    handleSubmit,
    getValues,
  } = useTypedFormContext();

  const { mutateAsync } = useSaveCustGroup();

  const handleSave = handleSubmit(
    async (data) => {
      console.log('save!', data);
    },
    (errors) => {
      console.warn(errors); // 保存できない原因で、残す
      // summarize errors into string
      const errorString = Object.entries(errors).reduce((acc, [key, value]) => {
        if (value) {
          acc += `${key} : ${value.message}\n`;
        }
        return acc;
      }, '');

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