import { CardContent, Stack } from '@mui/material';
import { LabeledInfo } from '../../../../../../components/ui/typographies';
import { generateParams } from '../../../../../../helpers/url';
import { pages } from '../../../../../Router';
import { ButtonEdit } from '../ButtonEdit';

export const ProjectDetails = ({
  projectDetailsData : {
    postal, address1, address2,
    $id, constructionType, constructionName,
    buildingType, agents, isAgentConfirmed, addressKari,
  },
}: {
  projectDetailsData : ProjectDetails.SavedData
}) => {

  const constructionOfficer =  agents.value
    .filter(item=>item.value.agentId.value)
    .map(item=>item.value.agentName.value)
    .join(', ');

  return (

    <CardContent sx={{ width: '30%' }}>
      <Stack spacing={1}>
        <LabeledInfo label="工事番号" data={$id.value} />
        <LabeledInfo label="工事種別" data={constructionType.value} />
        <LabeledInfo label="工事名称" data={constructionName.value} />
        <LabeledInfo label="建物種別" data={buildingType.value} />
        <LabeledInfo
          label="工事住所"
          data={[postal.value, address1.value, address2.value]
            .filter(Boolean)
            .map(item=>item)
            .join(' ')}
        />
        <LabeledInfo 
          label="工事担当"
          data={constructionOfficer}
        />

        <LabeledInfo label="担当確定" data={+isAgentConfirmed.value ? 'はい' : 'いいえ'} />
        <LabeledInfo label="仮換地地番" data={addressKari.value} />
        <ButtonEdit link={`${pages.projEdit}?${generateParams({
          projId: $id.value,
        })}`}
        />
      </Stack>
    </CardContent>


  );
};