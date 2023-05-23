import { CardContent, Stack } from '@mui/material';
import { IProjects } from 'types';
import { generateParams } from '../../../../../../helpers/url';
import { pages } from '../../../../../Router';
import { ButtonEdit } from '../ButtonEdit';
import { Info } from '../../common/Info';

export const ProjectDetails = ({
  projectDetailsData : {
    address1,
    address2,
    addressKari,
    agents,
    buildingType,
    dataId,
    isAgentConfirmed,
    postal,
    projName,
    projTypeName,
    uuid,
  },
}: {
  projectDetailsData : IProjects
}) => {

  const constructionOfficer =  agents.value
    .filter(item=>item.value.agentId.value)
    .map(item=>item.value.agentName.value)
    .join(', ');

  return (

    <CardContent sx={{ width: '40%' }}>
      <Stack spacing={1}>
        <Info label="工事番号" value={dataId.value} />
        <Info label="工事種別" value={projTypeName.value} />
        <Info label="工事名称" value={projName.value} />
        <Info label="建物種別" value={buildingType.value} />
        <Info
          label="工事住所"
          value={[postal.value, address1.value, address2.value]
            .filter(Boolean)
            .map(item=>item)
            .join(' ')}
        />
        <Info
          label="工事担当"
          value={constructionOfficer}
        />

        <Info label="担当確定" value={+isAgentConfirmed.value ? 'はい' : 'いいえ'} />
        <Info label="仮換地地番" value={addressKari.value} />
        <ButtonEdit link={`${pages.projEdit}?${generateParams({
          projId: uuid.value,
        })}`}
        />
      </Stack>
    </CardContent>


  );
};