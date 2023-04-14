
interface FieldMap { 
  field: string; 
}


export const fieldMapSorter = ({ field: a }: FieldMap, { field: b }: FieldMap) => a > b ? 1 : -1;