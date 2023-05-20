import { useContractsByCustGroupId, useInvoicesById, useInvoicesSummaryByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../form';
import { convertContractsToForm } from '../api/convertContractsToForm';

export const useContractListTable = (initialValues: TypeOfForm) => {

  const {
    custGroupId,
    invoiceId,
  } = initialValues;

  const { data: datContracts } = useContractsByCustGroupId(custGroupId);
  const { data: datInvoice } = useInvoicesById(invoiceId);
  const { data: datInvoicesSummary } = useInvoicesSummaryByCustGroupId(custGroupId);
  const {
    records: recContracts,
    calculated,
  } = datContracts || {};
  const {
    record: recInvoice,
  } = datInvoice || {};

  return convertContractsToForm({
    recContracts,
    calculated,
    recInvoice,
    datInvoicesSummary,
  });
};