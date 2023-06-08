export type Option = {
  label: string,
  value: string,
  isRetired: boolean,
  sortKey: number,
};

export type GroupedEmployees = {
  [key: string]: Option[]
};