import { Fade, Stack } from '@mui/material';
import { CustomEmailField } from './CustomEmailField';
import { useOrderWatch } from '../../hooks/useOrderRHF';
import { TOrderForm } from '../../schema';
import { EmailToField } from './EmailToField';

export const EmailFields = () => {
  const orderMethod = useOrderWatch({
    name: 'orderMethod',
  }) as TOrderForm['orderMethod'];


  return (
    <Fade in={orderMethod === 'メール'} >
      <Stack
        spacing={2}
        direction={'row'}
        flex={1}
      >
        <EmailToField />
        <CustomEmailField label="CC" name='emailCc' />
        <CustomEmailField label="BCC" name='emailBcc' />
      </Stack>
    </Fade>
  );
};