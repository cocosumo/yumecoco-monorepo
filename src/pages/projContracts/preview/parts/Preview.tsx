import { Button, Stack } from '@mui/material';
import { OutlinedDiv } from '../../../../components/ui/containers';

export const Preview = () => {

  return (
    <OutlinedDiv label='プレビュー' >
      <Stack sx={{ 'height': '800px' }}>
        <Button disabled variant='outlined'>プレビューを取得</Button>
      </Stack>
    </OutlinedDiv>
  );
};