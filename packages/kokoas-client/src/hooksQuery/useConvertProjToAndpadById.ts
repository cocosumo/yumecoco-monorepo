import { SaveProjectData } from 'api-andpad';
import { useCustGroupByProjId } from './useCustGroupByProjId';

export const useConvertProjToAndpadById = (projId: string | undefined) => {
  const queryResult = useCustGroupByProjId(projId ?? '');

  const { data } = queryResult;

  if (!data || !data.projData || !data?.custGroupData) return queryResult;

  const { projData, custGroupData } = data;


  /*   const {

  } = projData || {}; */

  const {
    uuid: custGroupId,
  } = custGroupData || {};


  const convertedData: any = {
    顧客管理ID: custGroupId.value,
  };

  return {
    ...queryResult,
    data: convertedData,
  };

};