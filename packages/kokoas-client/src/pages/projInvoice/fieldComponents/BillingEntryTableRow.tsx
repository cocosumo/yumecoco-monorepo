import { TableCell, TableRow } from '@mui/material';
import { createPaymentList } from 'api-kintone/src/estimates/createPaymentList';
import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { FormikMoneyField, FormikSelect } from 'kokoas-client/src/components';
import { ChangeEvent } from 'react';
import { getEstimatesFieldName, TMaterials, TypeOfForm } from '../form';

export const BillingEntryTableRow = ({
  estimate,
  idx,
  paymentList,
}: {
  estimate: TMaterials
  idx: number
  paymentList: ReturnType<typeof createPaymentList>[] | undefined
}) => {
  const {
    setValues,
  } = useFormikContext<TypeOfForm>();


  const paymentItem = paymentList?.find(({ uuid }) => uuid === estimate.estimateId);
  const paymentTypeOption = paymentItem?.paymentTypeList.map((item) => {
    return ({
      label: item,
      value: item,
    });
  });

  const billingAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues((prev) => {
      const newVal = produce(prev, (draft) => {
        draft.estimates[idx].billingAmount = e.target.value;
      });

      return newVal;
    });
  };

  const amountTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    const arrayIdx = paymentTypeOption?.findIndex(({ value }) => value === e.target.value) ?? 0;

    setValues((prev) => {
      const newVal = produce(prev, (draft) => {
        draft.estimates[idx].billingAmount = paymentItem?.paymentAmtPerType?.[arrayIdx] ?? '0';
      });

      return newVal;
    });
  };



  return (
    <TableRow>
      <TableCell>
        {estimate.projTypeName}
      </TableCell>
      <TableCell align="right">
        {estimate.dataId.split('-').at(-1)}
      </TableCell>
      <TableCell align="right">
        <FormikSelect
          name={getEstimatesFieldName(idx, 'amountType')}
          options={paymentTypeOption}
          onChange={amountTypeChange}
          size={'small'}
        />
      </TableCell>
      <TableCell align="right">
        <FormikMoneyField
          name={getEstimatesFieldName(idx, 'billingAmount')}
          size={'small'}
          onChange={billingAmountChange}
          sx={{ textAlign: 'right' }}
        />
      </TableCell>
    </TableRow>
  );
};