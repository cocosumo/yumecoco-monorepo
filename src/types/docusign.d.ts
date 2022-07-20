type TEnvelopeStatus = 'sent' | 'completed' | 'delivered' | '';

interface ISendEnvelopeResponse {
  /** base64 files */
  documents: string[],
  envelopeStatus: string,
  envelopeId: string,
}
