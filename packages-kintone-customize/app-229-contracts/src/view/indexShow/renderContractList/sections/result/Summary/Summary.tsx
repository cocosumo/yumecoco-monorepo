import { Stack } from '@mui/material';
import { Prospect } from './prospect/Prospect';
import { Remarks } from './remarks/Remarks';

export const Summary = () => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
    >
      {/* 備考 */}
      <Remarks />

      {/* 見込み情報 */}
      {/* <Prospect /> */}

      {/* 成功と失敗事例 */}

      {/* 合計 */}
    </Stack>
  );
};