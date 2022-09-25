import { Card, CardContent, Stack } from '@mui/material';
import { LabeledDetail } from '../../../../../../components/ui/typographies/LabeledDetail';
import { generateParams } from '../../../../../../helpers/url';
import { pages } from '../../../../../Router';

import { ButtonEdit } from '../ButtonEdit';

export const DTProject = (props: {
  fetchedProjects : ProjectDetails.SavedData[],
}) => {

  const { fetchedProjects } = props;


  return (
    <div>
      {
        fetchedProjects?.map(({
          $id,
          postal, address1, address2,
          addressKari,
          constructionName, constructionType,
          buildingType,
          isAgentConfirmed,
          agents,
        }) => {

          return (
            <Stack key={$id.value} spacing={2} mb={2}>
              <Card variant='outlined'>
                <CardContent>
                  <LabeledDetail label="工事番号" value={$id.value} />
                  <LabeledDetail label="工事種別" value={constructionType.value} />
                  <LabeledDetail label="工事名称" value={constructionName.value} />
                  <LabeledDetail label="建物種別" value={buildingType.value} />
                  <LabeledDetail
                    label="工事住所"
                    value={[postal.value, address1.value, address2.value]
                      .filter(Boolean)
                      .map(item=>item)
                      .join(' ')}
                  />
                  <LabeledDetail label="工事担当" value={
                agents.value
                  .filter(item=>item.value.agentId.value)
                  .map(item=>item.value.agentName.value)
                  .join(', ')
                }
                  />

                  <LabeledDetail label="担当確定" value={+isAgentConfirmed.value ? 'はい' : 'いいえ'} />
                  <LabeledDetail label="仮換地地番" value={addressKari.value} />
                  <ButtonEdit link={`${pages.projEdit}?${generateParams({
                    projId: $id.value,
                  })}`}
                  />
                </CardContent>
                <CardContent>
                  <LabeledDetail label="工事番号" value={$id.value} />
                  <LabeledDetail label="工事種別" value={constructionType.value} />
                  <LabeledDetail label="工事名称" value={constructionName.value} />
                  <LabeledDetail label="建物種別" value={buildingType.value} />
                  <LabeledDetail
                    label="工事住所"
                    value={[postal.value, address1.value, address2.value]
                      .filter(Boolean)
                      .map(item=>item)
                      .join(' ')}
                  />
                  <LabeledDetail label="工事担当" value={
                agents.value
                  .filter(item=>item.value.agentId.value)
                  .map(item=>item.value.agentName.value)
                  .join(', ')
                }
                  />

                  <LabeledDetail label="担当確定" value={+isAgentConfirmed.value ? 'はい' : 'いいえ'} />
                  <LabeledDetail label="仮換地地番" value={addressKari.value} />
                  <ButtonEdit link={`${pages.projEdit}?${generateParams({
                    projId: $id.value,
                  })}`}
                  />
                </CardContent>
              </Card>
            </Stack>
          );
        })
      }
    </div>
  );
};