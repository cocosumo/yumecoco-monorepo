export interface URLParams {
  projId?: string
  projEstimateId?: string,
  custGroupId?: string,
  menuOpen?: number,
  invoiceId?: number,
}

export type KeyOfUrlParams = keyof URLParams;