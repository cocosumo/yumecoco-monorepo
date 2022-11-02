import { KEmployees, IEmployees, IProjects } from "types";

type TProjReq = {
  projId?: string,
  custGroupId?:string,
  envelopeId?: string,
  origin?: string
}

type KeyOfProjDetails = keyof IProjects;
type KeyOfProjEstimates = keyof ProjectEstimates.SavedData;
type KeyOfEmployees = KEmployees;
type KeyOfEmployeesStores = keyof IEmployees['affiliateStores']['value'][number]['value'];

type TReqPreviewParams = {
  projId: string,
  projEstimateId: string
  userCode: string,
}

interface ReqSendContract {
  userCode: string,
  projEstimateId: string,
  signMethod?: 'electronic' | 'wetInk',
}
interface ReqDownloadParams {
  userCode: string,
  projEstimateId: string,
  fileType: 'pdf' | 'xlsx',
}

// This also exist at the frontend.
type AgentType = 'cocoAG' | 'yumeAG' | 'cocoConst';
type Company = 'すてくら' | 'ここすも' | 'ゆめてつ'


