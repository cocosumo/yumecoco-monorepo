import { Collapse, Stack } from '@mui/material';

import { ButtonEdit } from './ButtonEdit';
import { LabeledDetail } from './LabeledDetail';

export const DTProject = (props: {

  loading: boolean,
  fetchedProjects : ConstructionDetails.SavedData[],
}) => {

  const { fetchedProjects, loading } = props;





  console.log(fetchedProjects, 'fetchsdsdsd');
  return (
    <Collapse in={!loading}>
      {
        fetchedProjects?.map(({
          $id,
          postal, address1, address2,
          addressKari,
          constructionName, constructionType,
          agents,
        }) => {

          return (
            <Stack key={$id.value}>
              <LabeledDetail label="工事番号" value={$id.value} />
              <LabeledDetail label="工事種別" value={constructionType.value} />
              <LabeledDetail label="工事名称" value={constructionName.value} />
              <LabeledDetail
                label="工事住所"
                value={[postal.value, address1.value, address2.value]
                  .filter(Boolean)
                  .map(item=>item)
                  .join(' ')
                  } />
              <LabeledDetail label="工事番号" value={
                agents.value
                  .filter(item=>item.value.employeeId.value)
                  .map(item=>item.value.employeeName.value)
                  .join(', ')
                } />

              <LabeledDetail label="仮換地地番" value={addressKari.value} />

              <ButtonEdit link={`/construction/edit/${$id.value}`}/>
            </Stack>
          );
        })
      }
    </Collapse>);
};