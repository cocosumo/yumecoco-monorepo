import { parseKintoneDate } from 'kokoas-client/src/lib';
import { IContracts } from 'types';
import { TypeOfForm } from '../schema';
import { calculateAmount, roundTo } from 'libs';
import { selectFieldConfig } from '../selectFieldConfig';

export const convertContractToForm = (
  contract: IContracts,
) : Partial<TypeOfForm> => {

  const {
    uuid,
    projId,
    projEstimateId,

    contractType,
    contractAddType,
    purpose,
    structure,
    scale,
    projPeriod,
    annotation,

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

    othersAmt,
    othersAmtDate,

    hasRefund,
    refundAmt,
    refundMethod,

    hasReduction,
    reductionAmt,

    hasSubsidy,
    subsidyAmt,
    //subsidyMethod,

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
    projEstimateId: projEstimateId.value,

    contractType: contractType.value || '契約',
    contractAddType: contractAddType.value || '追加工事',
    purpose: purpose.value || selectFieldConfig.purpose?.default || '',
    structure: structure.value || selectFieldConfig.structure?.default || '',
    scale: scale.value || selectFieldConfig.scale?.default || '',
    projPeriod: +(projPeriod.value || 30),
    annotation: annotation.value || '',

    totalContractAmtAfterTax: roundTo(+totalContractAmt.value),
    totalProfit: roundTo(+totalProfit.value),
    taxRate: +tax.value,
    profitRate: roundTo(+(profitRate || 0) * 100, 2),
    totalContractAmtBeforeTax: roundTo(+(amountBeforeTax || 0)),
    costPrice: roundTo(+(costPrice || 0)),
    

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

    hasOthersAmt: !!+othersAmt.value,
    othersAmt: +othersAmt.value,
    othersAmtDate: parseKintoneDate(othersAmtDate.value, null),


    hasRefund: hasRefund.value === 'はい',
    refundAmt: +refundAmt.value,
    refundMethod: refundMethod.value as TypeOfForm['refundMethod'] || '山豊工建',

    hasReduction: hasReduction.value === 'はい',
    reductionAmt: +reductionAmt.value,

    hasSubsidy: hasSubsidy.value === 'はい',
    subsidyAmt: +subsidyAmt.value,

    //subsidyMethod: subsidyMethod.value as TypeOfForm['subsidyMethod'],
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