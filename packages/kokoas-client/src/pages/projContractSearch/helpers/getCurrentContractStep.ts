import { Recipients } from 'docusign-esign';

export const getCurrentContractStep = (jsonData: string) => {

  if (!jsonData) return undefined;

  const { signers, carbonCopies, currentRoutingOrder } = JSON.parse(jsonData) as Recipients;

  const filtered = [
    ...signers || [],
    ...carbonCopies || [],
  ]
    .filter((r) => r.routingOrder === currentRoutingOrder);
  
  // 未完了のものがあれば、その中で最初のものを返す
  if (filtered.length) {
    const incompleteRecipient = filtered.find((r) => r.status !== 'completed');
    if (incompleteRecipient) {
      return incompleteRecipient;
    } else {
      // テスト用に、未完了がなければ、最初のものを返す。
      return filtered[0];
    }
  }
};