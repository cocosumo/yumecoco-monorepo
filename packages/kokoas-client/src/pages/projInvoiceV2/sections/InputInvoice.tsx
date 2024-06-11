import { DisplaySection } from './InputInvoice/DisplaySection';
import { InputSection } from './InputInvoice/InputSection/InputSection';
import { RemarksGroup } from './InputInvoice/RemarksGroup/RemarksGroup';
import { Summary } from './InputInvoice/Summary';
import { Divider, Stack } from '@mui/material';



export const InputInvoice = () => {

  return (
    <Stack direction='column' spacing={2}>
      <Divider />

      <DisplaySection />
      <InputSection />
      <RemarksGroup />
      <Summary />
    </Stack>
  );
};
