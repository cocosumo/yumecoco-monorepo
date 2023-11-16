import { useAllContracts, useProjects, useSearchCustGroupByKeyword } from 'kokoas-client/src/hooksQuery';
import { TStatusFilter } from './SearchDialogContent';
import { useMemo } from 'react';
import { TEnvelopeStatus } from 'types';

export const useFilteredCustGroup = ({
  keyword,
  filter,
}:{
  keyword: string,
  filter: TStatusFilter
}) => {
  const { 
    data = [], 
    ...others
  } = useSearchCustGroupByKeyword({ keyword });
  const { data: recProjects = [] } = useProjects();
  const { data: recContracts = [] } = useAllContracts();



  const filteredData = useMemo(() => {
    const noFilter = Object.values(filter).every((v) => !v);

    if (noFilter) return data;
    
    return data.filter((cg) => {
      const relatedProjects = recProjects.filter((proj) => proj.custGroupId.value === cg.uuid.value);
      const relatedContracts = recContracts
        .filter((contract) => 
          (contract.envelopeStatus.value as TEnvelopeStatus === 'completed') 
        && relatedProjects.some((proj) => proj.uuid.value === contract.projId.value));

      const isMatchedWithProjects = !filter['案件有'] || (filter['案件有'] && relatedProjects.length > 0);
      const isMatchNoProjects = !filter['顧客登録のみ'] || (filter['顧客登録のみ'] && relatedProjects.length === 0);
      const  isMatchedWithContracts = !filter['契約有'] || (filter['契約有'] && relatedContracts.length > 0);

      return isMatchedWithProjects &&  isMatchNoProjects && isMatchedWithContracts;
    
    });
  }
  , [data, filter, recContracts, recProjects]);
  
  

  return {
    data: filteredData,
    ...others,
  };
};