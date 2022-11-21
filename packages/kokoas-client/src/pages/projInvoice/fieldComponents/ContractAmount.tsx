import { FormControl, FormLabel, Stack, Typography } from '@mui/material';
import { useEstimatesByProjId } from '../../../hooksQuery/useEstimatesByProjId';
import { TypeOfForm } from '../form';
import { useContractAmount } from '../hooks/useContractAmount';

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
        <FormLabel>
          契約金額(税込) &thinsp;
        </FormLabel>
        {!error && !isFetching && !!amount && <Typography>
          {`${Math.round(amount).toLocaleString()} 円`}
        </Typography>}
        {(error || isFetching || !amount) && <Typography>
          {'--- 円'}
        </Typography>}
      </Stack>
    </FormControl>
  );
};