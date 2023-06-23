import { CircularProgress, Link } from '@mui/material';
import { useAndpadOrderByProjId } from 'kokoas-client/src/hooksQuery';
import { IProjects } from 'types';

export const SystemId = ({
  recProj,
}:{
  recProj: IProjects,
}) => {

  const {
    uuid: projId,
    forceLinkedAndpadSystemId,
  } = recProj;

  const isForced = !!forceLinkedAndpadSystemId.value;
  const { data: andpadData, isLoading } = useAndpadOrderByProjId(projId.value);

  if (!isForced && isLoading) return <CircularProgress size={12} />;

  const {
    システムID: systemId,
  } = andpadData || {};

  const resolvedSystemId = systemId || forceLinkedAndpadSystemId.value ;

  if (!resolvedSystemId) {
    return '未接続';
  }


  const link = `https://andpad.jp/my/orders/${systemId}`;

  return (
    <Link
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {resolvedSystemId}
      {isForced && ' (強制接続)'}
    </Link>
  );

};
