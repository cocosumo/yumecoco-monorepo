import { useQuery } from '@tanstack/react-query';
import { AppIds } from 'config';
import { convertProjToAndpad } from '../api/andpad/convertProjToAndpad';


export const useConvertToAndpadByProjId = (projId = '') => {

  return useQuery(
    ['andpad', AppIds.projects, projId],
    () => convertProjToAndpad(projId),
    {
      enabled: !!projId,
    },
  );
};