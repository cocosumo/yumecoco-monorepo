import { dateStrToJA } from '../../../helpers/utils';

/**
 * Simplify kintone records to make it easier to manipulate.
 *
 * @param records
 * @returns simplified Record
 */
export const simplifyKintoneRecords = (records: TypeOfProjectDetails[]) => {
  if (!records.length) return [];

  console.log(records);

  return records.map((r) => {
    const {
      $id, memo, constructionName, custGroupId,
      custGroup, agents, custGroupAgents,
      store, rank,
      更新日時, 作成日時,
      schedContractDate, estatePurchaseDate, planApplicationDate,
      schedContractPrice,
    } = r;



    return {
      工事番号: $id.value,
      メモ: memo.value,
      工事名: constructionName.value,
      ゆめてつAG: custGroupAgents.value
        ?.filter(({ value: { custAgentId, custAgentType } }) => !!custAgentId.value && custAgentType?.value === 'yumeAG' as AgentType)
        ?.map(({ value: { custAgentName } }) => custAgentName?.value)
        .join('、 ') ?? '',
      ここすもAG: custGroupAgents.value
        ?.filter(({ value: { custAgentId, custAgentType } }) => !!custAgentId.value && custAgentType?.value === 'cocoAG' as AgentType)
        ?.map(({ value: { custAgentName } }) => custAgentName?.value)
        .join('、 ') ?? '',
      ここすも工事: agents.value
        ?.filter(({ value: { agentId, agentType } }) => !!agentId?.value && agentType?.value === 'cocoConst' as AgentType)
        ?.map(({ value: { agentName } }) => agentName.value)
        .join('、 ') ?? '',
      ランク: rank.value,
      顧客番号: custGroupId.value,
      顧客名: `${custGroup?.value?.[0]?.value?.custName?.value ?? ''}`,
      全顧客: custGroup?.value?.map(({ value: { custName } }) => custName.value).join(', '),
      店舗名: store.value,
      更新日時:  dateStrToJA(更新日時?.value),
      作成日時: dateStrToJA(作成日時?.value),
      契約予定金額: schedContractPrice?.value ? `${schedContractPrice.value}円` : '',
      不動産決済日: dateStrToJA(estatePurchaseDate.value, false),
      設計申し込み日: dateStrToJA(planApplicationDate.value, false),
      契約予定日: dateStrToJA(schedContractDate.value, false),
    };
  });

};