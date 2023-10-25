import { getAgentNamesByType as projGetAgentNamesByType } from 'api-kintone/src/projects/helpers/getAgentNamesByType';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { IProjects } from 'types';
import { DetailSection } from '../common/DetailSection';
import { useCustGroupById } from 'kokoas-client/src/hooksQuery';
import { getAgentNamesByType } from 'api-kintone/src/custgroups/helpers/getAgentNamesByType';
import { Tooltip, Typography } from '@mui/material';

export const OfficerDetails = ({
  recProj,
}:{
  recProj: IProjects
}) => {
  
  const {
    agents,
    custGroupId,
    commissionRate,
    territory,
    store,
  } = recProj || {};

  const { 
    data: recCustGroup,
  } = useCustGroupById(custGroupId.value);

  const {
    agents: custGroupAgents,
    storeName: custGrpStoreName,
    territory: custGroupTerritory,
  }  = recCustGroup || {};
  const yumeAGNames =  projGetAgentNamesByType(agents, 'yumeAG') 
  || (custGroupAgents && getAgentNamesByType(custGroupAgents, 'yumeAG')) 
  || '-';

  const cocoAGNames =  projGetAgentNamesByType(agents, 'cocoAG')
  || (custGroupAgents && getAgentNamesByType(custGroupAgents, 'cocoAG'))
  || '-';

  const cocoConstNames =  projGetAgentNamesByType(agents, 'cocoConst')
  || (custGroupAgents && getAgentNamesByType(custGroupAgents, 'cocoConst'))
  || '-';

  const agentDetails: IDetail[] = [
    {
      label: '店舗',
      value: (
        <Tooltip title={`${territory.value || custGroupTerritory?.value} - ${store.value ? '工事データ' : '顧客データ'}`}>
          <Typography noWrap>
            {store.value || custGrpStoreName?.value}
          </Typography>
        </Tooltip>),
    },
    {
      label: 'ゆめてつAG',
      value:  `${yumeAGNames}　${commissionRate.value ? `紹介料率：${commissionRate.value}%` : ''}`,
    },
    {
      label: '営業担当者',
      value: cocoAGNames,
    },
    {
      label: '工事担当者',
      value: cocoConstNames,
    },
  ];


  return (
       
    <DetailSection 
      title="担当情報"
      details={agentDetails}
    />
  );
};