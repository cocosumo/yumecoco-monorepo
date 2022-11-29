import { FormControl, FormLabel, Stack, Typography } from '@mui/material';

/**
 * 契約金額コンポーネント
 * @param values :フォームの値 
 * @returns 
 */
export const ContractAmount = ({
  contractAmount,
}: {
  contractAmount: number
}) => {

  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel sx={{ width: 120 }}>
          契約金額(税込)
        </FormLabel>
        {!!contractAmount &&
          <Typography sx={{ width: 120, textAlign: 'right' }}>
            {`${Math.round(contractAmount).toLocaleString()} 円`}
          </Typography>}
        {!contractAmount &&
          <Typography sx={{ width: 120, textAlign: 'right' }}>
            {'--- 円'}
          </Typography>}
      </Stack>
    </FormControl>
  );
};