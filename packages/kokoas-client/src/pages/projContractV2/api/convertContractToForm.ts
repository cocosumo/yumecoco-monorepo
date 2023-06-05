import { parseKintoneDate } from 'kokoas-client/src/lib';
import { IContracts } from 'types';
import { TypeOfForm } from '../schema';
import { calculateAmount } from 'libs';

export const convertContractToForm = (
  contract: IContracts,
) : Partial<TypeOfForm> => {

  const {
    uuid,
    projId,

    totalContractAmt,
    totalProfit,

    contractAmt,
    contractAmtDate,

    initialAmt,
    initialAmtDate,

    interimAmt,
    interimAmtDate,

    finalAmt,
    finalAmtDate,

    hasRefund,
    refundAmt,

    hasSubsidy,
    subsidyAmt,
    subsidyMethod,

    payMethod,
    payDestination,

    startDate,
    startDaysAfterContract,

    finishDate,
    finishDaysAfterContract,

    deliveryDate,
    contractDate,

    envelopeStatus,
    envelopeId,
    signMethod,
    tax,
  } = contract;

  const calcResult = calculateAmount({
    amountAfterTax: +totalContractAmt.value,
    profit: +totalProfit.value,
    taxRate: +tax.value,
  });

  const {
    amountBeforeTax,
    profitRate,
    costPrice,
  } = calcResult;


  return {
    contractId: uuid.value,
    projId: projId.value,

    totalContractAmtAfterTax: +totalContractAmt.value,
    totalProfit: +totalProfit.value,
    taxRate: +tax.value,
    profitRate: +(profitRate || 0) * 100,
    totalContractAmtBeforeTax: +(amountBeforeTax || 0),
    costPrice: +(costPrice || 0),
    

    hasContractAmt: !!+contractAmt.value,
    contractAmt: +contractAmt.value,
    contractAmtDate:  parseKintoneDate(contractAmtDate.value, null),

    hasInitialAmt: !!+initialAmt.value,
    initialAmt: +initialAmt.value,
    initialAmtDate: parseKintoneDate(initialAmtDate.value, null),

    hasInterimAmt: !!+interimAmt.value,
    interimAmt: +interimAmt.value,
    interimAmtDate: parseKintoneDate(interimAmtDate.value, null),

    hasFinalAmt: !!+finalAmt.value,
    finalAmt: +finalAmt.value,
    finalAmtDate: parseKintoneDate(finalAmtDate.value, null),

    hasRefund: hasRefund.value === 'はい',
    refundAmt: +refundAmt.value,

    hasSubsidy: hasSubsidy.value === 'はい',
    subsidyAmt: +subsidyAmt.value,

    subsidyMethod: subsidyMethod.value as TypeOfForm['subsidyMethod'],
    payMethod: payMethod.value as TypeOfForm['payMethod'],

    payDestination: payDestination.value,

    startDate: parseKintoneDate(startDate.value, null),
    startDaysAfterContractDate: +startDaysAfterContract.value,

    finishDate: parseKintoneDate(finishDate.value, null),
    finishDaysAfterContractDate: +finishDaysAfterContract.value,

    deliveryDate: parseKintoneDate(deliveryDate.value, null),
    contractDate: parseKintoneDate(contractDate.value, null) || new Date(),

    envelopeId: envelopeId.value,
    envelopeStatus: envelopeStatus.value as TypeOfForm['envelopeStatus'],
    signMethod: signMethod.value as TypeOfForm['signMethod'] || 'electronic',
  };


};