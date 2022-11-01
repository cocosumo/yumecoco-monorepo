import { FormControl, FormLabel, Stack, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEstimatesByProjId } from '../../../hooksQuery/useEstimatesByProjId';
import { TypeOfForm } from '../form';

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

  const contractAmount = records?.reduce((acc, cur, idx) => {
    if (isEmpty(cur.envStatus.value) || cur.doNotUsePayment.value.length) return acc;
    
    return acc + (calculated?.[idx].totalAmountInclTax ?? 0);
  }, 0);


  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel>
          契約金額(税込) &emsp;
        </FormLabel>
        {!error && !isFetching && !!contractAmount && <Typography>
          {`${Math.round(contractAmount).toLocaleString()} 円`}
        </Typography>}
        {(error || isFetching || !contractAmount) && <Typography>
          {'--- 円'}
        </Typography>}
      </Stack>
    </FormControl>
  );
};