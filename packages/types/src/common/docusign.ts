
export const envelopeStatuses = [
  'sent',
  'created',
  'completed',
  'delivered',
  'voiding',
  'voided',
  '',
] as const;

export type TEnvelopeStatus = typeof envelopeStatuses[number];

export const roles = {
  officer: '担当者',
  customer: '顧客',
  storeMngr: '店長',
  accounting: '経理',
  main: '本社',
} as const;

export type TRecipientRole = keyof typeof roles;

export const events = [
  'envelope-sent',
  'envelope-resent',
  'envelope-delivered',
  'envelope-completed',
  'envelope-declined',
  'envelope-voided',
  'recipient-authenticationfailed',
  'recipient-autoresponded',
  'recipient-declined',
  'recipient-delivered',
  'recipient-completed',
  'recipient-sent',
  'recipient-resent',
  'template-created',
  'template-modified',
  'template-deleted',
  'envelope-corrected',
  'envelope-purge',
  'envelope-deleted',
  'envelope-discard',
  'recipient-reassign',
  'recipient-delegate',
  'recipient-finish-later',
  'click-agreed',
  'click-declined',
  'sms-opt-in',
  'sms-opt-out',
] as const;

export type TConnectEventType = typeof events[number];

export interface IRecipient {
  creationReason: string,
  isBulkRecipient: string,
  requireUploadSignature: string,
  name: string,
  firstName: string,
  lastName: string,
  email: string,
  recipientId: string,
  recipientIdGuid: string,
  requireIdLookup: string,
  userId: string,
  routingOrder: string,
  note: string,
  roleName: string,
  status: string,
  completedCount: string,
  deliveryMethod: string,
  recipientType: string
}

export interface IConnectEvent {
  event: TConnectEventType,
  uri: string,
  retryCount: string,
  configurationId: string,
  apiVersion: string,
  generatedDateTime: string,
  data: {
    accountId: string,
    recipientId: string,
    envelopeId: string,
    envelopeSummary: {
      status: string,
      emailSubject: string,
      emailBlurb: string,
      signingLocation: string,
      enableWetSign: string,
      allowMarkup: string,
      allowReassign: string,
      createdDateTime: string,
      lastModifiedDateTime: string,
      statusChangedDateTime: string,
      useDisclosure: string,
      sender: {
        userName: string,
        userId: string,
        accountId: string,
        email: string
      },
      recipients: IRecipient[],
      envelopeDocuments: [
        {
          documentId: string,
          documentIdGuid: string,
          name: string,
          type: string,
          order: string,
          display: string,
          includeInDownload: string,
          signerMustAcknowledge: string,
          templateRequired: string,
          authoritative: string,
          PDFBytes: string
        },
      ]
    }
  }
}



export type IConnectRecipients = IConnectEvent['data']['envelopeSummary']['recipients'];
export const signMethods = ['electronic', 'wetInk'] as const;
export type TSignMethod = typeof signMethods[number];