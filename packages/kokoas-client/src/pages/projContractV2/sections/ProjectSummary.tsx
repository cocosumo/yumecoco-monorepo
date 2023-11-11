
import { useWatch } from 'react-hook-form';
import { StaticContents } from '../parts/StaticContents';
import { TypeOfForm } from '../schema';
import { useAndpadOrderByProjId, useProjById } from 'kokoas-client/src/hooksQuery';
import { ComponentProps, useMemo } from 'react';
import { addressBuilder } from 'libs';
import { pages } from '../../Router';
import { Link } from '@mui/material';
import { getAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';


export const ProjectSummary = () => {
  const projId = useWatch<TypeOfForm>({
    name: 'projId',
  });

  const { data, isLoading } = useProjById(projId as string);
  const { data: andPadData } = useAndpadOrderByProjId(projId as string);

  const {
    システムID: systemId,
  } = andPadData || {};

  const parsedData : ComponentProps<typeof StaticContents>['data'] = useMemo(() => {
    if (!data) return [];

    const {
      projName,
      postal,
      address1,
      address2,
      agents,
      forceLinkedAndpadSystemId,
      store: storeName,
    } = data;

    const parsedAndpadSystemId = forceLinkedAndpadSystemId.value || systemId;

    /*    const cocoConstNames = agents.value
      .filter(({ value: { agentType } }) => (agentType.value as TAgents) === 'cocoConst')
      .map(({ value: { agentName } }) => agentName.value)
      .join(', '); */

    
    const address = addressBuilder({
      postal: postal.value,
      address1: address1.value,
      address2: address2.value,
    });
 
    return [
      { label: '工事名', value: projName.value },
      { label: '店舗', value: storeName.value },
      { label: 'ゆめてつAG', value: getAgentNamesByType(agents, 'yumeAG') || '-' },
      { label: 'ここすも営業担当', value: getAgentNamesByType(agents, 'cocoAG') || '-' },
      { label: '工事担当者', value: getAgentNamesByType(agents, 'cocoConst') || '-' },
      { label: '工事住所', value: address },
      { label: 'AndpadシステムID', value: parsedAndpadSystemId 
        ? ( 
          <Link href={`https://andpad.jp/my/orders/${parsedAndpadSystemId}`} target='_blank'>
            {parsedAndpadSystemId}
          </Link> 
        )
        : '未登録', 
      },
    ];

  }, [
    data,
    systemId,
  ]);
    

  return (
    <StaticContents 
      buttonLabel='工事情報を編集する'
      isLoading={isLoading}
      data={parsedData}
      pageUrl={pages.projEditV2}
    />
  );
};