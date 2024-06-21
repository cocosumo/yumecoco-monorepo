import { Stack } from '@mui/material';

export const Actions = () => {


  return (
    <Stack
      direction={'row'}
      spacing={2}
      justifyContent={'space-between'}
    >
      保存
      請求書発行
      再発行
      破棄
    </Stack>
  );
};
