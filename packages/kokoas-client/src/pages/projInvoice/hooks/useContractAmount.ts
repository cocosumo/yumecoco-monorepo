import { useFormikContext } from 'formik';
import { useContractsByProjId, useInvoiceTotalByProjId } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { TypeOfForm } from '../form';


export const useContractAmount = (
  projId: string,
) => {
  const { values } = useFormikContext<TypeOfForm>();
  const { estimates } = values;

  const {
    data: contracts,
  } = useContractsByProjId(projId);

  const { calculated } = contracts || {};


  const {
    data: Invoices,
  } = useInvoiceTotalByProjId(projId);

  const { totalInvoice } = Invoices || {};

  const contractAmount = useMemo(() => calculated?.reduce((acc, cur, idx) => {

    if (estimates?.[idx]?.isForPayment) return acc;

    return acc + cur.totalAmountInclTax;

  }, 0), [calculated, estimates]);


  return {
    contractAmount: contractAmount,
    invoiceTotal: totalInvoice,
    billingBalance: (contractAmount ?? 0) - (totalInvoice ?? 0),
  };
};