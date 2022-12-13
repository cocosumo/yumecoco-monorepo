import { TableCell, TableRow } from '@mui/material';
import { paymentListCreate } from 'api-kintone/src/estimates/paymentListCreate';
import { FormikSelect, FormikTextFieldV2 } from 'kokoas-client/src/components';
import { useState } from 'react';
import { array } from 'yup';
import { getEstimatesFieldName, TMaterials } from '../form';

export const BillingEntryTableBody = ({
  estimate,
  idx,
  paymentList,
}: {
  estimate: TMaterials
  idx: number
  paymentList: ReturnType<typeof paymentListCreate>[] | undefined
}) => {
  const [amount, setAmount] = useState('0');

  const paymentItem = paymentList?.find(({ uuid }) => uuid === estimate.estimateId);
  const paymentTypeOption = paymentItem?.paymentTypeList.split(', ').map((item) => {
    return ({
      label: item,
      value: item,
    });
  });

  const paymentAmountOption = paymentItem?.paymentAmtPerType.split(', ');

  const handleChange = (e: any) => {
    const arrayIdx = paymentTypeOption?.findIndex(({ value }) => value === e.target.value) ?? 0;
    console.log('paymentAmountOption', paymentAmountOption, arrayIdx);
    setAmount(paymentAmountOption?.[arrayIdx] ?? '0');
  };



  return (
    <TableRow>
      <TableCell>
        {estimate.projTypeName}
      </TableCell>
      <TableCell align="right">
        {estimate.dataId.split('-')[2]}
      </TableCell>
      <TableCell align="right">
        <FormikSelect
          name={getEstimatesFieldName(idx, 'amountType')}
          options={paymentTypeOption}
          onChange={handleChange}
          size={'small'}
        />
      </TableCell>
      <TableCell align="right">
        <FormikTextFieldV2
          value={amount}
          name={getEstimatesFieldName(idx, 'amountPerContract')}
          size={'small'}
          sx={{ textAlign: 'right' }}
        />
      </TableCell>
    </TableRow>
  );
};