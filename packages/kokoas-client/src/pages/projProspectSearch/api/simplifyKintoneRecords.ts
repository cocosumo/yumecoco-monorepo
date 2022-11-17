import { differenceInDays, parseISO } from 'date-fns';
import { IProjects, TAgents } from 'types';

/**
 * Simplify kintone records to make it easier to manipulate.
 *
 * @param records
 * @returns simplified Record
 */
export const simplifyKintoneRecords = (records: IProjects[]) => {
  if (!records.length) return [];

  return records.map((r) => {
    const {
      $id, memo, projName, custGroupId,
      custGroup, agents, custGroupAgents,
      store, rank,
      更新日時, 作成日時,
      schedContractDate, estatePurchaseDate, planApplicationDate,
      schedContractPrice,
    } = r;



    return {
      工事番号: $id.value,
      メモ: memo.value,
      工事名: projName.value,
      ゆめてつAG: custGroupAgents.value
        ?.filter(({ value: { custAgentId, custAgentType } }) => !!custAgentId.value && custAgentType?.value === 'yumeAG' as TAgents)
        ?.map(({ value: { custAgentName } }) => custAgentName?.value)
        .join('、 ') ?? '',
      ここすもAG: custGroupAgents.value
        ?.filter(({ value: { custAgentId, custAgentType } }) => !!custAgentId.value && custAgentType?.value === 'cocoAG' as TAgents)
        ?.map(({ value: { custAgentName } }) => custAgentName?.value)
        .join('、 ') ?? '',
      ここすも工事: agents.value
        ?.filter(({ value: { agentId, agentType } }) => !!agentId?.value && agentType?.value === 'cocoConst' as TAgents)
        ?.map(({ value: { agentName } }) => agentName.value)
        .join('、 ') ?? '',
      ランク: rank.value,
      顧客番号: custGroupId.value,
      顧客名: `${custGroup?.value?.[0]?.value?.custName?.value ?? ''}`,
      全顧客: custGroup?.value?.map(({ value: { custName } }) => custName.value).join(', '),
      店舗名: store.value,
      更新日時:  更新日時?.value,
      作成日時: 作成日時?.value,
      契約予定金額: schedContractPrice?.value ? `${schedContractPrice.value}` : '',
      不動産決済日: estatePurchaseDate?.value ?? '',
      設計申込日: planApplicationDate?.value ?? '',
      契約予定: schedContractDate?.value ?? '',
      経過日数: differenceInDays(new Date(), parseISO(更新日時.value)),
    };
  });

};