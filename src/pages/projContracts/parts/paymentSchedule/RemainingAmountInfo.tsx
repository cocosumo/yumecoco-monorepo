import { FormHelperText } from '@mui/material';

export const RemainingAmountInfo = ({
  remainingAmount,
}: {
  remainingAmount: number
}) => {
  return (
    <FormHelperText error={true}>
      契約合計と請求額が相違しています。
      {`相違額： ${remainingAmount?.toLocaleString() || 0} 円 。`}
    </FormHelperText>
  );
};