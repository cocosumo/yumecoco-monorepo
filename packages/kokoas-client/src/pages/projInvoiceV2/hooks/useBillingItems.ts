import { useContractsByProjIdV2, useInvoicesB2CByProjId } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from './useTypedRHF';
import { getBilledItems } from './helper/getBilledItems';
import { TInvoiceDetails } from '../schema';
import { getAllBillingItems } from './helper/getAllBillingItems';
import { getBillingItems } from './helper/getBillingItems';



export const useBillingItems = () => {

  const [
    projId,
    invoiceDetails,
  ] = useTypedWatch({
    name: [
      'projId',
      'invoiceDetails',
    ],
  }) as [string, TInvoiceDetails];

  const {
    data: contracts,
    isFetching: isFetchingContract,
  } = useContractsByProjIdV2(projId || '');

  const {
    data: invoices,
    isFetching: isFetchingInvoice,
  } = useInvoicesB2CByProjId(projId || '');

  // 既存の請求書から請求済みの請求項目リストを作成する
  const billedItems = getBilledItems({ invoices });

  // 作成中の請求書から使用中の請求項目リストを作成する
  const billingItems = getBillingItems({ invoiceDetails });

  const allBillingItems = getAllBillingItems({
    contracts,
    billedItems: billedItems.concat(billingItems),
  });

  return {
    billingItems: allBillingItems,
    isFetching: isFetchingContract || isFetchingInvoice,
  };
};
