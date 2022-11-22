import { FormControl, FormLabel, Stack, Typography } from '@mui/material';
import { useEstimatesByProjId } from '../../../hooksQuery/useEstimatesByProjId';
import { TypeOfForm } from '../form';
import { useContractAmount } from '../hooks/useContractAmount';

/**
 * 契約金額コンポーネント
 * @param values :フォームの値 
 * @returns 
 */
export const ContractAmount = ({
  values,
}: {
  values: TypeOfForm
}) => {
  const { projId } = values;

  const {
    error,
    isFetching,
  } = useEstimatesByProjId(projId);

  const { contractAmount: amount } = useContractAmount(projId);


  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel sx={{ width: 120 }}>
          契約金額(税込)
        </FormLabel>
        {!error && !isFetching && !!amount && <Typography sx={{ width: 120, textAlign: 'right' }}>
          {`${Math.round(amount).toLocaleString()} 円`}
        </Typography>}
        {(error || isFetching || !amount) && <Typography sx={{ width: 120, textAlign: 'right' }}>
          {'--- 円'}
        </Typography>}
      </Stack>
    </FormControl>
  );
};