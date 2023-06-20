import { Button, Stack } from '@mui/material';
import { GoToContractButton } from '../navigationComponents/GoToContractButton';

export const ActionButtons = () => {
  return (

    <Stack direction="row" spacing={2}>
      <Button>
        保存
      </Button>
      <Button>
        復帰
      </Button>
      <GoToContractButton />
    </Stack>
  );
};