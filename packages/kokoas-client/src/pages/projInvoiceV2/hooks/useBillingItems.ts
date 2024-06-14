import { useContractsByProjIdV2, useInvoicesB2CByProjId } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from './useTypedRHF';
import { getBillingItems } from './helper/getBillingItems';
import { getBilledItems } from './helper/getBilledItems';



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
  } = useInvoicesB2CByProjId(projId || '');

  // 請求書から請求済みの請求項目リストを作成する
  const billedItems = getBilledItems({ invoices });

  const billingItems = getBillingItems({
    contracts,
    billedItems,
  });

  return {
    billingItems: billingItems,
    isFetching: isFetchingContract || isFetchingInvoice,
  };
};
