import { Stack } from '@mui/material';
import { CopyForm } from './formActions/CopyForm';
import { SelectExistEstimates } from './SelectExistEstimates';

export const ButtonMenu = ({
  projId,
}: {
  projId: string
}) => {
  return (

    <Stack direction={'row'} spacing={2}>
      {/* 見積もりの検索 */}
      {projId && <SelectExistEstimates projId={projId} />}

      {/* コピー */}
      <CopyForm />
    </Stack>

  );
};