import { Territory } from 'types';

export interface CwRoomIds {
  cwRoomId: string,
  agentId: string,
  agentName: string,
}

export interface PaymentReminder {
  andpadPaymentUrl: string,
  reminderUrl: string,
  contractId: string,
  projId: string,
  projName: string,
  projType: string,
  contractDate: string,
  totalContractAmount: string,
  territory: Territory,
  expectedPaymentDate: string,
  cwRoomIds: CwRoomIds[],
}
