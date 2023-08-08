import { Stack } from '@mui/material';
import { DeleteButton } from './DeleteButton';
import { CommonActions } from './CommonActions';
import { FormActionsAlert } from './FormActionsAlert';
import { grey } from '@mui/material/colors';

export const FormActions = () => {

  return (
    <Stack 
      spacing={2}
    >
      <FormActionsAlert />

      <Stack
        direction="row"
        spacing={2}
        px={2}
        alignItems={'center'}
        justifyContent={'space-between'}
        border={1}
        borderRadius={2}
        borderColor={grey[300]}
        bgcolor={'white'}
      >
        <CommonActions />

        <DeleteButton />

      </Stack>

    </Stack>
    
  );
};