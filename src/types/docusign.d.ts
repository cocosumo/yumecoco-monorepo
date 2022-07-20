type TEnvelopeStatus = 'sent' | 'completed' | 'delivered' | '';

interface ISendEnvelopeResponse {
  /** base64 files */
  documents: string[],
  envelopeStatus: TEnvelopeStatus,
  envelopeId: string,
}
