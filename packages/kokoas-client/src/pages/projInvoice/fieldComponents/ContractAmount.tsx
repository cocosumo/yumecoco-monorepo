import { FormControl, FormLabel, Stack, Typography } from '@mui/material';
import { useEstimatesByProjId } from '../../../hooksQuery/useEstimatesByProjId';
import { TypeOfForm } from '../form';
import { contractAmount } from '../helpers/contractAmount';

export const ContractAmount = ({
  values,
}: {
  values: TypeOfForm
}) => {
  const { projId } = values;

  const {
    data,
    error,
    isFetching,
  } = useEstimatesByProjId(projId);
  
  const {
    calculated,
    records,
  } = data || {};
  
  const amount = contractAmount(records, calculated);


  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel>
          契約金額(税込) &emsp;
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