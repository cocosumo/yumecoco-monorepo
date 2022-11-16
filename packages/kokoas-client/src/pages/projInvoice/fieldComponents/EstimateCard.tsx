import { Card, CardContent, Chip, Stack, Typography } from '@mui/material';
import { useField } from 'formik';
import { FormikLabeledCheckBox } from 'kokoas-client/src/components/ui/checkboxes';
import { IProjestimates } from 'types';

const FormLabel = ({
  label,
  value,
}: {
  label: string,
  value: string,
}) => {

  return (
    <Stack direction={'row'} spacing={2}>
      <Typography variant='caption'>
        {label}
      </Typography>
      <Typography>
        {value}
      </Typography>
    </Stack>
  );
};

export const EstimateCard = ({
  record,
  projId,
  totalAmountInclTax,
  name,
}: {
  record: IProjestimates
  projId: string,
  totalAmountInclTax: number
  name: string
}) => {

  const isForPayment = record.isForPayment.value.length ? true : false;
  /* addArray(record.$id.value, isForPayment, idx); */

  return (
    <Card key={`${projId}_${record.$id.value}`}>
      <CardContent>
        <Stack spacing={1} direction={'row'}>
          {!!record.estimateStatus.value &&
            <Chip
              size='small'
              color="primary"
              label={record.estimateStatus.value}
            />}
          <Chip
            size='small'
            color="success"
            label='契約'
          />
        </Stack>
        <FormLabel
          label='見積もり番号'
          value={record.$id.value}
        />
        <FormLabel
          label='契約金額'
          value={Math.round(totalAmountInclTax).toLocaleString() + '円'}
        />
        <FormLabel
          label='契約日'
          value={record.contractDate.value}
        />
        <FormikLabeledCheckBox
          label='請求に使用しない'
          defaultVal={isForPayment}
          name={name}
        />
      </CardContent>
    </Card>
  );
};