


export type AddRecordFn = (record: RecordParam) => Promise<UpsertRecordResult>;

export type RecordParam = { [fieldCode: string]: { value: unknown } };



export interface AppRecord {
  app: string,
  record: RecordParam
}

export interface UpsertRecordResult {
  id: string,
  revision: string
}

export interface UpdateRecordParam {
  id: string;
  record?: RecordParam;
  revision?: string;
}

export interface UpdateCustInGrpRecsParam {
  customers: UpdateRecordParam[],
  group: UpdateRecordParam
}

export interface UpsertRecordsResult {
  ids: string[],
  revisions: string[],
  records?: UpsertRecordResult[];
}

export type UpsertCustInGrpResult = {
  customers: UpsertRecordsResult,
  group: UpsertRecordResult
};

export interface CustInGrpRecsParam {
  customers: RecordParam[],
  group: RecordParam
}



export type AddCustFn = (transactionPayload: CustInGrpRecsParam) => Promise<UpsertCustInGrpResult>;
export type UpdateCustFn = (transactionPayload: UpdateCustInGrpRecsParam) => Promise<UpsertCustInGrpResult>;
