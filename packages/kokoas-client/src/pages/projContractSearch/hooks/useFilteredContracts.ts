import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { calculateEstimateRecord } from 'api-kintone';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useCustGroups, useEstimates, useInvoices, useProjects } from 'kokoas-client/src/hooksQuery';
import { latestInvoiceReducer } from '../helpers/latestInvoiceReducer';
import { formatDataId } from 'libs';
import { IInvoices, TEnvelopeStatus, roles } from 'types';
import { initialValues, TypeOfForm } from '../form';
import { itemsSorter } from '../helpers/itemsSorter';
import { getCurrentContractStep } from '../helpers/getCurrentContractStep';
import { useCallback } from 'react';

export interface ContractRow {
  contractStatus: TEnvelopeStatus,
  currentContractRole: string,
  currentContractName: string,
  uuid: string,
  custGroupId: string,
  projId: string,
  projDataId: string,
  estimateDataId: string,
  projName: string,
  store: string,
  yumeAG: string,
  cocoAG: string,
  custName: string,
  contractDate: string,
  contractAmount: number,
  grossProfit: number,
  profitRate: number,
  latestInvoiceDate: string,
  latestInvoiceAmount: number,
  plannedPaymentDate: string,
  invoiceId: string,
}


/**
 *
 *  フィルター条件から、契約データを取得
 *
 * 他のところで必要になったら、改修しhooksQueryに移動
 * */
export const useFilteredContracts = () => {
/* URLのParamsを監視し、フィルター条件を再設定する。 */

  const {
    mainSearch,
    amountFrom,
    amountTo,
    contractDateFrom,
    contractDateTo,
    order = initialValues.order,
    orderBy = initialValues.orderBy || 'estimateDataId',
    contractCompleted,
    contractStepAG,
    contractStepAccounting,
    contractStepCustomer,
    contractStepMain,
    contractStepTencho,
  } = useURLParams<TypeOfForm>();

  const { data: projData } = useProjects();
  const { data: custGroupData } = useCustGroups();
  const { data: invoiceData } = useInvoices();

  return useEstimates({
    enabled: !!projData && !!custGroupData && !!invoiceData,
    select: useCallback((d) => {

      if (!projData || !custGroupData || !invoiceData) return;

      let minAmount = 0;
      let maxAmount = 0;

      // Combine data
      const items = d.reduce<ContractRow[]>((acc, cur) => {

        /* 見積情報 */
        const {
          projId,
          uuid,
          dataId,
          envStatus,
          contractDate,
          envRecipients,
        } = cur;

        // 契約進捗の中に何も選択されていないかチェック
        const noContractStatusSelected = [
          contractCompleted,
          contractStepAG,
          contractStepAccounting,
          contractStepCustomer,
          contractStepMain,
          contractStepTencho,
        ].every((v) => !v);

        /* 契約じゃないなら、次のレコードへ行く */
        if (!envStatus.value) return acc;

        /* 契約進捗のフィルター */
        const currentContractStep = getCurrentContractStep(envRecipients.value);
        

        /* 工事情報 */
        const {
          projName,
          custGroupId,
        } = projData.find((projRec) => projRec.uuid.value === projId.value ) || {};

        /* 顧客情報 */
        const {
          custNames,
          cocoAGNames,
          yumeAGNames,
          storeName,
        } = custGroupData.find((custGroupRec) => custGroupRec.uuid.value === custGroupId?.value ) || {};

        /* 直近請求情報 */
        const {
          plannedPaymentDate,
          issuedDateTime,
          billingAmount,
          uuid: invoiceId,
        } = invoiceData
          .reduce(
            latestInvoiceReducer(uuid.value),
            undefined as IInvoices | undefined,
          ) || {};

        const formattedDataId = formatDataId(dataId.value);
        const projDataId = formattedDataId.substring(0, formattedDataId.length - 3);

        /* 契約金額と粗利 */
        const {
          summary : {
            totalProfit,
            totalAmountAfterTax,
            overallProfitRate,
          },
        } = calculateEstimateRecord({ record: cur });

        /* minとmaxを設定 */
        if (totalAmountAfterTax < minAmount) {
          minAmount = totalAmountAfterTax;
        }

        if (totalAmountAfterTax > maxAmount) {
          maxAmount = totalAmountAfterTax;
        }

        const envelopeStatus = envStatus.value as TEnvelopeStatus;

        const resultRow = {
          contractStatus: envelopeStatus,
          currentContractRole: currentContractStep?.roleName || '',
          currentContractName: currentContractStep?.name || '',
          uuid: uuid.value,
          custGroupId: custGroupId?.value || '',
          projId: projId.value,
          projDataId,
          estimateDataId: formattedDataId,
          cocoAG: cocoAGNames?.value || '',
          yumeAG: yumeAGNames?.value || '',
          contractDate:  contractDate?.value  || '',

          latestInvoiceAmount: +(billingAmount?.value || ''),
          latestInvoiceDate: issuedDateTime?.value ? format(parseISO(issuedDateTime.value), 'yyyy-MM-dd') : '',
          plannedPaymentDate: plannedPaymentDate?.value || '',
          invoiceId: invoiceId?.value || '',

          custName: custNames?.value || '',
          projName: projName?.value || '',
          store: storeName?.value || '',
          contractAmount: totalAmountAfterTax,
          grossProfit: totalProfit,
          profitRate: overallProfitRate,
        };

        /* 絞り込み */
        const contractDateMil = contractDate.value ? new Date(contractDate.value) : undefined ;

        const isMainSearch = !mainSearch || Object.values(resultRow).some((val) => val.toString().includes(mainSearch));
        const isAboveMinAmount = !(amountFrom && totalAmountAfterTax < +amountFrom);
        const isBelowMaxAmount = !(amountTo && totalAmountAfterTax > +amountTo);
        const afterContractDateFrom = contractDateMil && contractDateFrom
          ? new Date(contractDateFrom) <= contractDateMil
          : !contractDateFrom;
        const beforeContractDateTo = contractDateMil && contractDateTo
          ? addDays(new Date(contractDateTo), 1) >= contractDateMil
          : !contractDateTo;

        const isIncompleteContract = envelopeStatus === 'sent';
        const isInContractStatus = noContractStatusSelected 
          || (contractCompleted && envelopeStatus === 'completed')
          || (isIncompleteContract && contractStepAG && currentContractStep?.roleName === roles.officer)
          || (isIncompleteContract && contractStepAccounting && currentContractStep?.roleName === roles.accounting)
          || (isIncompleteContract && contractStepCustomer && currentContractStep?.roleName === roles.customer)
          || (isIncompleteContract && contractStepMain && currentContractStep?.roleName === roles.main)
          || (isIncompleteContract && contractStepTencho && currentContractStep?.roleName === roles.storeMngr);


        // 含むかどうか判定、
        if (isMainSearch
          && isAboveMinAmount
          && isBelowMaxAmount
          && afterContractDateFrom
          && beforeContractDateTo
          && isInContractStatus
        ) {
          acc.push(resultRow);
        }

        return acc;
      },
      [],
      );

      // ソート
      const sortedItems = items.sort(itemsSorter({ order, orderBy }));

      // 結果
      return {
        items: sortedItems,
        minAmount,
        maxAmount,
      };
    }, [
      projData,
      custGroupData,
      invoiceData,
      mainSearch,
      amountFrom,
      amountTo,
      contractDateFrom,
      contractDateTo,
      order,
      orderBy,
      contractCompleted,
      contractStepAG,
      contractStepAccounting,
      contractStepCustomer,
      contractStepMain,
      contractStepTencho,
    ]),
  });

};