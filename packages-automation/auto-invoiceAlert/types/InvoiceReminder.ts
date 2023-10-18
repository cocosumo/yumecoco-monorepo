import { Territory } from 'types';

export interface CwRoomIds {
  cwRoomId: string,
  agentId: string,
  agentName: string,
}

export interface InvoiceReminder {
  alertState: boolean
  andpadInvoiceUrl: string
  reminderUrl: string
  contractId: string
  projId: string
  projName: string
  projType: string
  contractDate: string
  territory: Territory
  expectedCreateInvoiceDate: string | null
  yumeAG: string
  cwRoomIds: CwRoomIds[]
  totalContractAmount: string
}
