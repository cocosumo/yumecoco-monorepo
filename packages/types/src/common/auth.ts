
export interface IDSAccount {
  accountId: string,
  accountName : string,
  baseUri: string,
  isDefault: string,
  organization: {
    links:{
      href: string, // 'https://account-d.docusign.com/organizations/020a334d-4...79-9e8af32ce1bb',
      rel: string, // self
    }[],
    organization_id: string, // '020a334d....8af32ce1bb',
  },
}

export interface IGetUserInfoResponse {
  accounts: Array<IDSAccount>
}