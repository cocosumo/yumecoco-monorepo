import { SaveProjectData } from 'api-andpad';
import { useCustGroupByProjId } from './useCustGroupByProjId';

export const useConvertProjToAndpadById = (projId: string | undefined) => {
  const queryResult = useCustGroupByProjId(projId ?? '');

  const { data } = queryResult;

  if (!data) return queryResult;

  const { projData } = data;
  const {

  } = projData || {};


  const convertedData: SaveProjectData = {
    顧客名,
  };

  return {
    ...queryResult,
    data: convertedData,
  };

};