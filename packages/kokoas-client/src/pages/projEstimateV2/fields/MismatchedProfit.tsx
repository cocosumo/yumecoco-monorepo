import { Alert, Button } from '@mui/material';
import {  UseFormReturn, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../form';

/**
 * 利益は最新のものと格納されているものとと違う
 * 知らせるコンポーネント
 *
 * @returns
 */
export const MismatchedProfit = (formReturn : UseFormReturn<TypeOfForm>) => {

  const {
    setValue,
    control,
  } = formReturn;

  const [projTypeProfitLatest, projTypeName] = useWatch({
    control,
    name: ['projTypeProfitLatest', 'projTypeName' ], 
  });

  const handleUpdateProfit = () => {
    setValue('projTypeProfit',  projTypeProfitLatest);
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