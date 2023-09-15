import { Territory } from 'types';


export interface PaymentReminder {
  andpadPaymentUrl: string,
  contractId: string,
  projId: string,
  projName: string,
  projType: string,
  contractDate: string,
  totalContractAmount: string,
  territory: Territory,
  alertTarget: {
    code: string,
    name: string,
  }[]
}
