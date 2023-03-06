import { Recipients } from 'docusign-esign';

export const getCurrentContractStep = (jsonData: string) => {

  if (!jsonData) return undefined;

  const { signers, carbonCopies, currentRoutingOrder } = JSON.parse(jsonData) as Recipients;

  return [
    ...signers || [],
    ...carbonCopies || [],
  ]
    .find((r) => r.routingOrder === currentRoutingOrder);
};