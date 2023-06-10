import { Typography } from '@mui/material';

export const ResultCount = ({
  count,
}:{
  count: number
}) => {
  return (
    <Typography>
      {`結果件数：${count}件`}
    </Typography>
  );
};