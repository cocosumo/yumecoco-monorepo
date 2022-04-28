import { Collapse, Stack } from '@mui/material';
import { LabeledDetail } from './LabeledDetail';

export const DTProject = (props: {
  projects?: CustomerGroupTypes.SavedData['projects'],
  loading: boolean,
}) => {
  const { projects,  loading } = props;

  return (
    <Collapse in={!loading}>
      {
        projects?.value.map(({
          id,
          value: {
            constructionName,
          },
        }) => {
          return (
            <Stack key={id}>
              <LabeledDetail label="工事名" value={constructionName.value} />
            </Stack>
          );
        })
      }
    </Collapse>);
};