import { FormControl, FormLabel, Stack, Typography } from '@mui/material';

export const ContractAmount = () => {

  const contractAmount = 'xxx,xxx'; // 契約金額の算出処理を実装すること T165にて対応

  return (
    <FormControl>
      <Stack direction={'row'}>
        <FormLabel>
          契約金額(税込)
        </FormLabel>
        <Typography>
          {`${contractAmount} 円`}
        </Typography>
      </Stack>
    </FormControl>
  );
};