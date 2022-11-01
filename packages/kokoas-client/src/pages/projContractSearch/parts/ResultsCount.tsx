import { Typography } from '@mui/material';

export const ResultsCount = ({
  resultCount,
}: {
  resultCount: number
}) => {
  return (
    <Typography variant={'subtitle1'}>
      {`${resultCount} 件`}
    </Typography>
  );
};