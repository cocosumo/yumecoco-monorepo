import { Stack } from '@mui/material';
import { InputDate } from '../../../common/InputDate';

export const InvoiceInputFields = () => {

  return (
    <Stack
      direction={'row'}
      spacing={2}
    >
      <Stack
        spacing={2}
        width={200}
      >
        <InputDate label='納品日' />
        <InputDate label='請求締め日' />
        <InputDate label='支払日' />
      </Stack>

      <Stack>
        {/* <InvoiceInputField /> */}
        {/* <InvoiceInputField /> */}
        {/* <InvoiceInputField /> */}
      </Stack>

    </Stack>
  );
};