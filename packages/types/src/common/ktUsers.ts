export interface IUser {
  birthDate: string | null,
  callto: string,
  code: string,
  ctime: string,
  customItemValues: Array< {
    code: string,
    value: string,
  } >,
  description: string,
  email: string,
  employeeNumber: string,
  extensionNumber: string,
  givenName: string,
  givenNameReading: string,
  id: string,
  joinDate: string | null,
  localName: string,
  localNameLocale: string,
  locale: string,
  mobilePhone: string,
  mtime: string,
  name: string,
  phone: string,
  primaryOrganization: string,
  sortOrder: string | null,
  surName: string,
  surNameReading: string,
  timezone: string,
  url: string,
  valid: true,

}

export interface IGetUsersResult {
  users: IUser[]
}
