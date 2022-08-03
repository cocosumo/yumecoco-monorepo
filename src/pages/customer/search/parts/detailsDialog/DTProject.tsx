import { Divider, Stack } from '@mui/material';
import { jaEnvelopeStatus } from '../../../../../lib/jaEnvStatus';

import { ButtonEdit } from './ButtonEdit';
import { LabeledDetail } from './LabeledDetail';

export const DTProject = (props: {
  fetchedProjects : ConstructionDetails.SavedData[],
}) => {

  const { fetchedProjects } = props;

  return (
    <>

      {
        fetchedProjects?.map(({
          $id,
          postal, address1, address2,
          addressKari,
          constructionName, constructionType,
          buildingType,
          isAgentConfirmed,
          agents,
          envelopeStatus,
        }) => {

          return (
            <Stack key={$id.value} spacing={2} mb={2}>
              <LabeledDetail label="工事番号" value={$id.value} />
              <LabeledDetail label="工事種別" value={constructionType.value} />
              <LabeledDetail label="工事名称" value={constructionName.value} />
              <LabeledDetail label="建物種別" value={buildingType.value} />
              <LabeledDetail
                label="工事住所"
                value={[postal.value, address1.value, address2.value]
                  .filter(Boolean)
                  .map(item=>item)
                  .join(' ')
                  } />
              <LabeledDetail label="工事担当" value={
                agents.value
                  .filter(item=>item.value.agentId.value)
                  .map(item=>item.value.agentName.value)
                  .join(', ')
                } />

              <LabeledDetail label="担当確定" value={Boolean(+isAgentConfirmed.value) ? 'はい' : 'いいえ'} />
              <LabeledDetail label="仮換地地番" value={addressKari.value} />
              <LabeledDetail label="契約" value={jaEnvelopeStatus(envelopeStatus.value as  TEnvelopeStatus).ja} />

              <ButtonEdit link={`/project/edit?projId=${$id.value}`}/>
              <Divider light/>
            </Stack>
          );
        })
      }</>
  );
};