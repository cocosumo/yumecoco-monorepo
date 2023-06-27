import { useAndpadOrderByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../../hooks/useTypedRHF';
import { StaticContents } from 'kokoas-client/src/components';
import { SaveToAndpadButton } from '../../../parts/saveToAndpad/SaveToAndpadButton';
import { Alert } from '@mui/material';
import { ForcedAndpadLink } from '../../../parts/ForcedAndpadLink';
import { SystemId } from './SystemId';

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
        <SystemId 
          projId={projId as string}
          systemId={systemId}
          forceLinkedAndpadSystemId={forcedSystemId}
        />
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
          <SaveToAndpadButton 
            isExist={!!andpadRec}
            disabled={!!forcedSystemId}
          />
        
          <ForcedAndpadLink 
            projId={projId as string} 
            disabled={!!systemId}
            isLoading={isBusy}
          />        
        </>
      )}
    >
      {!isBusy && !parsedSystemId && (
        <Alert
          severity='warning'
        >
          Andpadで案件管理IDが見つかりません。Andpadへ登録をお願いします。
        </Alert>
      )}

    </StaticContents>
  );
};