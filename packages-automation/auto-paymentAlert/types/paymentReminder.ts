import { Territory } from 'types';

export interface CwRoomIds {
  cwRoomId: string,
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
  cwRoomIds: CwRoomIds[],
}
