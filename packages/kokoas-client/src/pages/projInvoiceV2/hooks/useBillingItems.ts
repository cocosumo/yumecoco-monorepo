import { useContractsByProjIdV2, useInvoiceB2CByProjId } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from './useTypedRHF';
import { getBillingItems } from './helper/getBillingItems';
import { IContracts } from 'types';



/* const billingItems: BillingItems[] = [{
    contractType: '契約',
    label: '着工金',
    amount: 600000,
    disabled: false,
  },
  {
    contractType: '契約',
    label: '最終金',
    amount: 400000,
    disabled: false,
  },
  {
    contractType: '追加',
    label: 'その他',
    amount: -500000,
    disabled: false,
  }]; */






export const useBillingItems = () => {

  const [
    projId,
  ] = useTypedWatch({
    name: [
      'projId',
    ],
  }) as [string];

  const {
    data: contracts,
    isFetching: isFetchingContract,
  } = useContractsByProjIdV2(projId || '');

  const {
    data: invoices,
    isFetching: isFetchingInvoice,
  } = useInvoiceB2CByProjId(projId || '');


  const billingItems = getBillingItems({ contracts: contracts });

  return {
    billingItems: billingItems,
    isFetching: isFetchingContract || isFetchingInvoice,
  };
};
