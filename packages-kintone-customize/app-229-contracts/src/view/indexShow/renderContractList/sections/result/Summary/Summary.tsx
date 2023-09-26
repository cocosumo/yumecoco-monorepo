import { Stack } from '@mui/material';
import { Prospect } from './prospect/Prospect';
import { OverallRemarks } from './OverallRemarks/OverallRemarks';
import { OutcomesRemarks } from './outcomesRemarks/OutcomesRemarks';
import { TotalResult } from './totalResult/TotalResult';

export const Summary = () => {
  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      spacing={2}
      width={2400}
    >
      {/* 備考 */}
      <OverallRemarks />
      
      {/* 見込み情報 */}
      <Prospect />

      {/* 成功と失敗事例 */}
      <OutcomesRemarks />

      {/* 合計 */}
      <TotalResult />
    </Stack>
  );
};