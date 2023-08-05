import { KAndpadOrderResult } from 'types/src/common/andpad.order';
import { useAndpadBySystemId } from './useAndpadBySystemId';
import { useAndpadOrderByProjId } from './useAndpadOrderByProjId';
import { useProjById } from './useProjById';



export const useDetailedAndpadOrderByProjId = ({
  projId,
  series,
}:{
  projId: string;
  series: KAndpadOrderResult[]
}) => {
  const { data: projData, isLoading } = useProjById(projId);
  const {
    forceLinkedAndpadSystemId,
  } = projData || {};
  
  const isForced = !!forceLinkedAndpadSystemId?.value;

  const { data: andpadOrder } = useAndpadOrderByProjId(projId, {
    enabled: !isForced && !isLoading,
  });

  const {
    システムID: systemId,
  } = andpadOrder || {};
  
  const parsedSystemId = String(forceLinkedAndpadSystemId?.value || systemId || '');

  const result = useAndpadBySystemId({
    systemId: parsedSystemId,
    series,
  });

  return {
    ...result,
    data: {
      ...result.data,
      isForced,
    },
  };

};