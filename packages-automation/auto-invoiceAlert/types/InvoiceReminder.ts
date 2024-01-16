import { Territory } from 'types';

export interface CwRoomIds {
  cwRoomId: string,
  agentId: string,
  agentName: string,
}

export interface InvoiceReminder {
  alertState: boolean
  systemId: string
  andpadInvoiceUrl: string
  reminderUrl: string
  contractId: string
  projId: string
  projName: string
  projType: string
  storeName: string
  contractDate: string
  territory: Territory
  expectedCreateInvoiceDate: string | null
  expectedPaymentDate: string
  yumeAG: string
  cwRoomIds: CwRoomIds[]
  totalContractAmount: string
}
