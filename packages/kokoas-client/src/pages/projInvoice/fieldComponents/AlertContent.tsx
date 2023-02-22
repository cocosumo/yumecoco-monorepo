import { Checkbox, FormControlLabel, Typography } from '@mui/material';

export const AlertContent = ({
  onClick,
  isError,
  checkboxVal,
  isBilled,
}: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined
  isError: boolean
  checkboxVal: boolean
  isBilled: boolean
}) => {
  return (
    <>
      <FormControlLabel
        control={
          <Checkbox
            size="small"
            onClick={onClick}
            checked={checkboxVal}
            disabled={isBilled}
          />
        }
        label="承諾済"
        sx={{
          width: 100,
          color: isError ? 'red' : 'default',
        }}
      />
      <Typography
        color={'red'}
      >
        契約金額を超過しています。
        <br />
        お客さまより承諾を得ていますか？
      </Typography>
    </>
  );
};