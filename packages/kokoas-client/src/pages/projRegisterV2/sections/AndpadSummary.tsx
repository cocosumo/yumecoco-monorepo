import { useAndpadOrderByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../hooks/useTypedRHF';
import { StaticContents } from 'kokoas-client/src/components';
import { SaveToAndpadButton } from '../parts/saveToAndpad/SaveToAndpadButton';
import { Link } from '@mui/material';
import { ForcedAndpadLink } from '../parts/ForcedAndpadLink';

export const AndpadSummary = () => {
  const projId = useTypedWatch({
    name: 'projId',
  });

  const { 
    data: projRec, 
    isLoading: projLoading, 
  } = useProjById(projId as string);


  const {
    forceLinkedAndpadSystemId,
  } = projRec || {};

  const forcedSystemId = forceLinkedAndpadSystemId?.value;

  const { 
    data: andpadRec, 
    isLoading: andpadRecLoading,
  } = useAndpadOrderByProjId(
    projId as string,
    {
      enabled: projRec && !forcedSystemId,
    },
  );

  const isBusy = projLoading || andpadRecLoading;

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
      isLoading={isBusy}
      actions={(
        <>
          <SaveToAndpadButton isExist={!!andpadRec} />
        
          <ForcedAndpadLink 
            projId={projId as string} 
            disabled={!!systemId}
            isLoading={isBusy}
          />        
        </>
      )}
    />
  );
};