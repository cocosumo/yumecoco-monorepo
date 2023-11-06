import addDays from 'date-fns/addDays';

import { useAllContracts, useCustGroups, useCustomers, useProjects } from 'kokoas-client/src/hooksQuery';
import { calcProfitRate, formatDataId } from 'libs';
import { TEnvelopeStatus, TSignMethod } from 'types';
import { initialValues } from '../form';
import { itemsSorter } from '../helpers/itemsSorter';
import { getCurrentContractStep } from '../helpers/getCurrentContractStep';
import { useCallback } from 'react';
import { parseISODateToFormat, parseISOTimeToFormat } from 'kokoas-client/src/lib';
import { useTypedURLParams } from './useTypedHooks';

export interface ContractRow {
  category: string,
  refundAmt: number,
  reductionAmt: number,
  subsidyAmt: number,
  contractStatus: TEnvelopeStatus,
  currentContractRole: string,
  currentContractName: string,
  contractId: string,
  custGroupId: string,
  projId: string,
  projDataId: string,
  projName: string,
  store: string,
  yumeAG: string,
  cocoAG: string,
  custName: string,
  contractDate: string,
  contractAmount: number,
  grossProfit: number,
  profitRate: number,
  custNamesKana: string,
  //latestInvoiceDate: string,
  //latestInvoiceAmount: number,
  //plannedPaymentDate: string,
  //invoiceId: string,

  signMethod: TSignMethod,
  createdAt: string,
  updatedAt: string,
}

export type KContractRow = keyof ContractRow;


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
    custName,
    contractDateFrom,
    contractDateTo,
    order = initialValues.order,
    orderBy = initialValues.orderBy || 'contractDate',
    contractCompleted,
    contractIncomplete,

    stores = [],
    projTypes = [],
  } = useTypedURLParams();

  const { data: projData } = useProjects();
  const { data: custGroupData } = useCustGroups();
  const { data: custData } = useCustomers(); 

  return useAllContracts({
    enabled: !!projData && !!custGroupData && !!custData,
    select: useCallback((d) => {

      if (!projData || !custGroupData) return;

      let minAmount = 0;
      let maxAmount = 0;

      // Combine data
      const items = d.reduce<ContractRow[]>((acc, cur) => {

        /* 契約情報 */
        const {
          projId,
          uuid: contractId,
          envelopeStatus: envStatus,
          contractDate,
          envRecipients,
          totalContractAmt,
          totalProfit,
          tax,

          作成日時: createdAt,
          更新日時: updatedAt,
          refundAmt,
          reductionAmt,
          subsidyAmt,
          contractType,
          signMethod,
        } = cur; // 契約のデータ;

        // 契約進捗の中に何も選択されていないかチェック
        const noContractStatusSelected = [
          contractCompleted,
          contractIncomplete,
        ].every((v) => !v);

        /* 契約進捗のフィルター */
        const currentContractStep = getCurrentContractStep(envRecipients.value);
        

        /* 工事情報 */
        const {
          projName,
          custGroupId,
          dataId,
          projTypeName,
        } = projData.find((projRec) => projRec.uuid.value === projId.value ) || {};

        /* 顧客情報 */
        const {
          cocoAGNames,
          yumeAGNames,
          storeName,
          members,
        } = custGroupData.find((custGroupRec) => custGroupRec.uuid.value === custGroupId?.value ) || {};

        /* 顧客名 */
        const custIds = members?.value?.map(({ value: { custId } }) => custId.value) || [];
        const custDatas = custData?.filter(({ uuid }) => custIds.includes(uuid.value)) || [];

        // Group into comma delimited string
        const {
          custNames,
          custNamesKana,
        } = custDatas.reduce<{
          custNames: string,
          custNamesKana: string,
        }>((custAcc, custCur) => {
          const { fullName, fullNameReading } = custCur;
          const { custNames: _custNames, custNamesKana: _custNamesKana } = custAcc;

          return {
            custNames: _custNames ? `${_custNames}, ${fullName.value}` : fullName.value,
            custNamesKana: _custNamesKana ? `${_custNamesKana}, ${fullNameReading.value}` : fullNameReading.value,
          };
        }, {
          custNames: '',
          custNamesKana: '',
        });
          


        const taxRate = +tax.value || 0.1;
        const totalAmountAfterTax = +totalContractAmt.value;
        const totalAmountBeforeTax = +totalContractAmt.value / (1 + taxRate);
        const totalCost = totalAmountBeforeTax - +totalProfit.value ;


        /* minとmaxを設定 */
        if (totalAmountAfterTax < minAmount) {
          minAmount = totalAmountAfterTax;
        }

        if (totalAmountAfterTax > maxAmount) {
          maxAmount = totalAmountAfterTax;
        }



        const envelopeStatus = envStatus.value as TEnvelopeStatus;

        const resultRow: ContractRow = {
          signMethod: signMethod.value as TSignMethod,
          contractStatus: envelopeStatus,
          currentContractRole: currentContractStep?.roleName || '',
          currentContractName: currentContractStep?.name || '',
          contractId: contractId.value,
          custGroupId: custGroupId?.value || '',
          projId: projId.value,
          projDataId: formatDataId(dataId?.value || ''),
          cocoAG: cocoAGNames?.value || '-',
          yumeAG: yumeAGNames?.value || '-',
          contractDate:  parseISODateToFormat(contractDate?.value)  || '-',

          refundAmt: +refundAmt.value,
          reductionAmt: +reductionAmt.value,
          subsidyAmt: +subsidyAmt.value,
          category: contractType?.value || '契約',

          //latestInvoiceAmount: +(billingAmount?.value || ''),
          //latestInvoiceDate: issuedDateTime?.value ? format(parseISO(issuedDateTime.value), 'yyyy-MM-dd') : '',
          //plannedPaymentDate: plannedPaymentDate?.value || '',
          //invoiceId: invoiceId?.value || '',

          custName: custNames || '-',
          custNamesKana: custNamesKana || '-',
          projName: projName?.value || '-',
          store: storeName?.value || '-',
          contractAmount: totalAmountAfterTax,
          grossProfit: +totalProfit.value,
          profitRate: calcProfitRate(totalCost, totalAmountBeforeTax ),

          createdAt: parseISOTimeToFormat(createdAt.value),
          updatedAt: parseISOTimeToFormat(updatedAt.value),
        };

        /* 絞り込み */
        const contractDateMil = contractDate.value ? new Date(contractDate.value) : undefined ;
        const isMatchCustName = !custName || custNames?.includes(custName) || custNamesKana?.includes(custName); 
        const isMainSearch = !mainSearch || Object.values(resultRow).some((val) => val.toString().includes(mainSearch));
        const isAboveMinAmount = !(amountFrom && totalAmountAfterTax < +amountFrom);
        const isBelowMaxAmount = !(amountTo && totalAmountAfterTax > +amountTo);
        const afterContractDateFrom = contractDateMil && contractDateFrom
          ? new Date(contractDateFrom) <= contractDateMil
          : !contractDateFrom;
        const beforeContractDateTo = contractDateMil && contractDateTo
          ? addDays(new Date(contractDateTo), 1) >= contractDateMil
          : !contractDateTo;

        const isMatchContractStatus = noContractStatusSelected 
          || (contractCompleted && envelopeStatus === 'completed')
          || (contractIncomplete && envelopeStatus !== 'completed');


        const isStoreSelected = stores?.length ? stores.includes(storeName?.value || '') : true;
        const isProjTypeSelected = projTypes?.length ? projTypes.includes(projTypeName?.value || '') : true;

        // 含むかどうか判定、
        if (isMainSearch
          && isMatchCustName
          && isAboveMinAmount
          && isBelowMaxAmount
          && afterContractDateFrom
          && beforeContractDateTo
          && isMatchContractStatus
          && isStoreSelected
          && isProjTypeSelected
        ) {
          acc.push(resultRow);
        }

        return acc;
      },
      []);

      // ソート
      const sortedItems = items.sort(itemsSorter({ order, orderBy: orderBy as KContractRow }));

      // 結果
      return {
        items: sortedItems,
        minAmount,
        maxAmount,
      };
    }, [
      projData,
      custGroupData,
      custData,
      mainSearch,
      amountFrom,
      amountTo,
      contractDateFrom,
      contractDateTo,
      order,
      orderBy,
      contractCompleted,
      contractIncomplete,
      stores,
      custName,
      projTypes,
    ]),
  });

};