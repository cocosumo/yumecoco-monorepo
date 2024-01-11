import { KAndpadOrderResult } from 'types/src/common/andpad.order';
import { useAndpadBySystemId } from './useAndpadBySystemId';
import { useAndpadOrderByProjId } from './useAndpadOrderByProjId';
import { useProjById } from './useProjById';
import { useSnackBar } from '../hooks/useSnackBar';



export const useDetailedAndpadOrderByProjId = ({
  projId,
  series,
}:{
  projId: string;
  series: KAndpadOrderResult[]
}) => {
  const { setSnackState } = useSnackBar();
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
  }, {
    onError:(err) => setSnackState({
      open: true,
      message: `サーバーへの接続が失敗しました。お手数ですが、管理者にご連絡ください。エラーメッセージ：${(err as Error).message}`,
      severity: 'error',
    }),
  });

  return {
    ...result,
    data: {
      ...result.data,
      isForced,
    },
  };

};