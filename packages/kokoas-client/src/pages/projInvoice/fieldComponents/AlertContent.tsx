import { Typography } from '@mui/material';
import { FormikLabeledCheckBox } from 'kokoas-client/src/components';
import { getFieldName } from '../form';

export const AlertContent = ({
  isError,
  checkboxVal,
  isBilled,
}: {
  isError: boolean
  checkboxVal: boolean
  isBilled: boolean
}) => {

  return (
    <>
      <FormikLabeledCheckBox
        name={getFieldName('exceedChecked')}
        size="small"
        checked={checkboxVal}
        disabled={isBilled}
        label="承諾済"
        sx={{
          width: 100,
          textAlign: 'left',
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