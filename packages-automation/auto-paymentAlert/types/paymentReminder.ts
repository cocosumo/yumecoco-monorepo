import { Territory } from 'types';


export interface PaymentReminder {
  contractId: string,
  projId: string,
  projType: string,
  totalContractAmount: string,
  territory: Territory,
  alertTarget: {
    code: string,
    name: string,
  }[]
}
