export interface PaymentReminder {
  contractId: string,
  projId: string,
  projType: string,
  totalContractAmount: string,
  alertTarget: {
    code: string,
    name: string,
  }[]
}