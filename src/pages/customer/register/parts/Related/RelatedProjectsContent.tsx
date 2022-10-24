import { CardContent, Stack } from '@mui/material';
import { LabeledDetail } from '../../../../../components/ui/typographies/LabeledDetail';

export const RelatedProjectsContent = ({
  projId, projName,
}: {
  projId: string,
  projName: string
}) => {

  return (
    <CardContent>
      <Stack spacing={2}>
        <LabeledDetail label='工事番号' value={projId} direction={'column'} />
        <LabeledDetail label='工事名' value={projName} direction={'column'} />
      </Stack>
    </CardContent>
  );
};