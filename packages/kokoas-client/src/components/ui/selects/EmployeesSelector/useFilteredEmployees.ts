import { useAllEmployees } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { EmpAffiliations, EmpRoles, Territory } from 'types';

export interface FilterOptions {
  roles?: EmpRoles[],
  affiliation?: EmpAffiliations[],
  territory?: Territory[],
  includeInactive?: boolean,
}

interface FilteredOptionsExtendend extends FilterOptions {
  initialEmpId: string;
}


export const useFilteredEmployees = (filter?: FilteredOptionsExtendend) => {
  const query = useAllEmployees();

  const { data } = query;



  const filteredEmployees = useMemo(() => data
    ?.filter(({
      uuid: empId,
      affiliation,
      territory_v2: territory,
      役職: role,
      状態: status,
    }) => {
      if (filter?.initialEmpId === empId.value) return true;

      const isMatchAffiliation = !filter?.affiliation || filter?.affiliation?.includes(affiliation.value as EmpAffiliations);
      const isMatchTerritory = !filter?.territory || filter?.territory?.includes(territory.value as Territory);
      const isMatchRole = !filter?.roles || filter?.roles?.includes(role.value as EmpRoles);

      return isMatchAffiliation
      && isMatchTerritory
      && isMatchRole
      && (filter?.includeInactive || status.value === '有効');

    }), [
    data, 
    filter,
  ]);

  return {
    ...query,
    filteredData: filteredEmployees,
  };
};