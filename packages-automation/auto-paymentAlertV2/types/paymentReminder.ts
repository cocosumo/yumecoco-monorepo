import { Territory } from 'types';

export interface CwRoomIds {
  cwRoomId: string,
  agentId: string,
  agentName: string,
}

export interface PaymentReminder {
  alertState: boolean
  systemId: string
  paymentId: string
  andpadPaymentUrl: string
  reminderUrl: string
  contractId: string
  projId: string
  projName: string
  projType: string
  storeName: string
  contractDate: string
  territory: Territory
  expectedPaymentDate: string | null
  expectedPaymentAmt: string
  paymentType: string
  yumeAG: string
  cwRoomIds: CwRoomIds[]
  totalContractAmount: string
}
