import { useSnackBar } from 'kokoas-client/src/hooks';
import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../form';
import qs from 'qs';
import { filterNonNull } from 'libs';
import { useNavigate } from 'react-router-dom';

interface HandleSubmitParam {
  /** バリデーションが成功した時、実行 */
  onValid?: () => void,
  /** フォームデータを置き換える */
  newData?: Partial<TypeOfForm>
}

export const useSubmitHandler = () => {
  const { handleSubmit } = useFormContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const navigate = useNavigate();

  return (params ?: HandleSubmitParam) => handleSubmit(
    (data) => {

      const query = qs.stringify(filterNonNull({ ...data, ...params?.newData }));
      navigate(`?${query}`);
      params?.onValid?.();
    },
    (errors) => {
      const errorField = Object.values(errors)[0]; // Show first validation error instance

      setSnackState({
        open: true,
        message: `${errorField.message}`,
        severity: 'error',
      });
    },
  )();
};