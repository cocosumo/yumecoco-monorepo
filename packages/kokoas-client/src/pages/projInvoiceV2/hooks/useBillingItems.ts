import { useContractsByIds, useInvoicesB2CByProjId } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from './useTypedRHF';
import { getBilledItems } from './helper/getBilledItems';
import { TInvoiceDetails } from '../schema';
import { getAllBillingItems } from './helper/getAllBillingItems';
import { getBillingItems } from './helper/getBillingItems';
import { sortContracts } from '../helper/sortContracts';



export const useBillingItems = () => {

  const [
    invoiceId,
    projId,
    invoiceDetails,
    contractIds,
  ] = useTypedWatch({
    name: [
      'invoiceId',
      'projId',
      'invoiceDetails',
      'contractIds',
    ],
  }) as [string, string, TInvoiceDetails, string[]];

  const {
    data: contracts,
    isFetching: isFetchingContract,
  } = useContractsByIds({ contractIds });
  const sortedContracts = sortContracts(contracts || []);

  const {
    data: invoices,
    isFetching: isFetchingInvoice,
  } = useInvoicesB2CByProjId(projId || '');

  // 既存の請求書から請求済みの請求項目リストを作成する
  const billedItems = getBilledItems({
    invoices,
    invoiceId,
  });

  // 作成中の請求書から使用中の請求項目リストを作成する
  const billingItems = getBillingItems({ invoiceDetails });

  const allBillingItems = getAllBillingItems({
    contracts: sortedContracts,
    billedItems: billedItems.concat(billingItems),
  });

  return {
    billingItems: allBillingItems,
    isFetching: isFetchingContract || isFetchingInvoice,
  };
};
