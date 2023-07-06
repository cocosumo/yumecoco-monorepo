import { useAndpadBySystemId, useAndpadOrderByProjId } from 'kokoas-client/src/hooksQuery';
import { DetailSection } from '../common/DetailSection';
import { IProjects } from 'types';
import { CircularProgress, Link } from '@mui/material';

export const AndpadDetails = ({
  recProj,
}:{
  recProj: IProjects
}) => {

  const {
    uuid: projId,
    forceLinkedAndpadSystemId,
  } = recProj;

  const isForced = !!forceLinkedAndpadSystemId.value;

  /**
   * Forced
   */
  const { 
    data: fAndpadOrder, 
    isLoading: fIsLoading, 
  } = useAndpadBySystemId({
    systemId: forceLinkedAndpadSystemId.value,
    series: ['案件フロー'],
  });


  const {
    案件名: fProjectName,
  } = fAndpadOrder?.data?.object ?? {};

  /***
   * Normal
   */

  const { data: andpadOrder, isLoading } = useAndpadOrderByProjId(projId.value, {
    enabled: !isForced,
  });

  const {
    システムID: systemId,
    案件名: projectName,
  } = andpadOrder || {};

  const isBusy = fIsLoading || isLoading;


  const resolvedSystemId = systemId || forceLinkedAndpadSystemId.value ;
  const link = `https://andpad.jp/my/orders/${resolvedSystemId}`;
  
  const details = [
    {
      label: '登録手法',
      value: (
        <>
          {isBusy && <CircularProgress size={12} />}
          {!isBusy && !resolvedSystemId && '未登録'}
          {!isBusy && resolvedSystemId && isForced && '強制登録'}
          {!isBusy && resolvedSystemId && !isForced && '通常登録'}
        </>
      ),
    },
    {
      label: 'システムID',
      value: resolvedSystemId ?  (
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {resolvedSystemId}
        </Link>) : '-',
    },
    {
      label: '案件名',
      value: fProjectName || projectName || '-',
    },
  ];


  return (
    <DetailSection 
      title="Andpad情報"
      details={details}
    />

  );
};