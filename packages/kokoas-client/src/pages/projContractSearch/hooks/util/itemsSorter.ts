import { ContractRow } from '../useFilteredContracts';

export const itemsSorter = (key: keyof ContractRow) =>
  (a: ContractRow, b: ContractRow) => {

    return String(a[key]).localeCompare(String((b[key])));
  };