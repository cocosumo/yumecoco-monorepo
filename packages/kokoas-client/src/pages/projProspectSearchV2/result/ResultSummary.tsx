import { Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';

export const ResultSummary = ({
  dataCount = 0,
}:{
  dataCount?: number
}) => {
  return  (
    <Stack
      direction={'row'}
      alignItems={'center'}
    >
      <Typography
        color={grey[500]}
      >
        結果件数：
      </Typography>
      <Typography
        fontWeight={'bold'}
      >
        {dataCount}
      </Typography>
      <Typography
        color={grey[500]}
        fontSize={12}
        pl={0.5}
      >
        件
      </Typography>
      
    </Stack>
  );
};