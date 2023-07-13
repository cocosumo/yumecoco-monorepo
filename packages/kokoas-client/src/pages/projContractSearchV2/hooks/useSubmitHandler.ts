import { useSnackBar } from 'kokoas-client/src/hooks';
import qs from 'qs';
import { filterNonNull } from 'libs';
import { useNavigate } from 'react-router-dom';
import { TForm } from '../schema';
import { useTypedFormContext } from './useTypedHooks';

interface HandleSubmitParam {
  /** バリデーションが成功した時、実行 */
  onValid?: () => void,
  /** フォームデータを置き換える */
  newData?: Partial<TForm>
}

export const useSubmitHandler = () => {
  const { handleSubmit } = useTypedFormContext();
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