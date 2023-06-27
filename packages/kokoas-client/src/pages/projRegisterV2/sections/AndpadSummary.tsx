import { useAndpadOrderByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../hooks/useTypedRHF';
import { StaticContents } from 'kokoas-client/src/components';
import { SaveToAndpadButton } from '../parts/saveToAndpad/SaveToAndpadButton';
import { Link } from '@mui/material';

export const AndpadSummary = () => {
  const projId = useTypedWatch({
    name: 'projId',
  });

  const { data: projRec, isLoading } = useProjById(projId as string);


  const {
    forceLinkedAndpadSystemId,
  } = projRec || {};

  const forcedSystemId = forceLinkedAndpadSystemId?.value;

  const { data: andpadRec } = useAndpadOrderByProjId(
    projId as string,
    {
      enabled: projRec && !forcedSystemId,
    },
  );

  const {
    システムID: systemId,
    案件フロー: ankenFlow,

  } = andpadRec || {};

  const parsedSystemId = forcedSystemId || systemId;
  const isForced = !!forcedSystemId;

  let connectMethod = '-';

  if (isForced) {
    connectMethod = '強制';
  } else if (parsedSystemId) {
    connectMethod = '通常';
  }

  const parsedData = [
    {
      label: 'システムID',
      value: parsedSystemId ? (
        <Link 
          href={`https://andpad.jp/my/orders/${parsedSystemId}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {parsedSystemId}
        </Link>
      ) : '未接続',
    },
    {
      label: '接続手法',
      value: connectMethod, 
    },
    {
      label: '案件フロー',
      value: ankenFlow,
    },
  ];


  return (
    <StaticContents 
      data={parsedData}
      isLoading={isLoading}
      actions={(
        <SaveToAndpadButton isExist={!!andpadRec} />
      )}
    />
  );
};