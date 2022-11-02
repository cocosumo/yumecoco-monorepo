import { EnvelopeUpdateSummary } from 'docusign-esign';
import { TEnvelopeStatus } from './docusign';

export type TProjReq = {
  projId?: string,
  custGroupId?:string,
  envelopeId?: string,
  origin?: string
};

export interface ReqSendContract {
  userCode: string,
  projEstimateId: string,
  signMethod?: 'electronic' | 'wetInk',
}


export interface ISendEnvelopeResponse {
  /** base64 files */
  documents: string[],
  envelopeStatus: TEnvelopeStatus,
  envelopeId: string,
}


export interface IVoidRes {
  voidSuccess: boolean,
  envelopeStatus: TEnvelopeStatus,
  envelopSummary: EnvelopeUpdateSummary,
  documents?: string[],
  error?: string,
}

export interface IVoidReq {
  envelopeId: string,
  voidedReason: string
}

export interface ReqDownloadParams {
  userCode: string,
  projEstimateId: string,
  fileType: 'pdf' | 'xlsx',
}