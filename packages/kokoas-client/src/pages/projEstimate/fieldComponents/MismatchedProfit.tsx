import { Alert, Button } from '@mui/material';
import { useFormikContext } from 'formik';
import { getFieldName, TypeOfForm } from '../form';

/**
 * 利益は最新のものと格納されているものとと違う
 * 知らせるコンポーネント
 *
 * @returns
 */
export const MismatchedProfit = () => {
  const {
    values: {
      projTypeName,
      projTypeProfitLatest,
    },
    setFieldValue,
  } = useFormikContext<TypeOfForm>();

  const handleUpdateProfit = () => {
    setFieldValue(getFieldName('projTypeProfit'), projTypeProfitLatest);
  };

  return (
    <Alert
      severity={'info'}
      action={
        <Button
          color="inherit"
          size="small"
          onClick={handleUpdateProfit}
        >
          はい
        </Button>
            }
    >
      {`${projTypeName}の最新の利益率は${projTypeProfitLatest}%です。更新しますか。`}
    </Alert>
  );
};