
import { useWatch } from 'react-hook-form';
import { StaticContents } from '../parts/StaticContents';
import { TypeOfForm } from '../schema';
import { useProjById } from 'kokoas-client/src/hooksQuery';
import { ComponentProps, useMemo } from 'react';
import { addressBuilder } from 'libs';
import { TAgents } from 'types';
import { pages } from '../../Router';

export const ProjectSummary = () => {
  const projId = useWatch<TypeOfForm>({
    name: 'projId',
  });

  const { data, isLoading } = useProjById(projId as string);

  const parsedData : ComponentProps<typeof StaticContents>['data'] = useMemo(() => {
    if (!data) return [];

    const {
      projName,
      postal,
      address1,
      address2,
      agents,
    } = data;

    const cocoConstNames = agents.value
      .filter(({ value: { agentType } }) => (agentType.value as TAgents) === 'cocoConst')
      .map(({ value: { agentName } }) => agentName.value)
      .join(', ');
    
    const address = addressBuilder({
      postal: postal.value,
      address1: address1.value,
      address2: address2.value,
    });
 
    return [
      { label: '工事名', value: projName.value },
      { label: '工事担当者', value: cocoConstNames },
      { label: '工事住所', value: address },
    ];

  }, [
    data,
  ]);
    

  return (
    <StaticContents 
      buttonLabel='工事情報を編集する'
      isLoading={isLoading}
      data={parsedData}
      pageUrl={pages.projEdit}
    />
  );
};