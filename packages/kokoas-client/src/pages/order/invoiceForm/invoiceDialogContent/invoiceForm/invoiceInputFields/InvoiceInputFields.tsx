import { Stack } from '@mui/material';
import { InputDate } from '../../../common/InputDate';
import { InvoiceAmount } from './InvoiceAmount';
import { InfoFields } from './InfoFields';

export const InvoiceInputFields = () => {

  return (
    <Stack
      direction={'row'}
      spacing={4}
    >
      <Stack
        spacing={2}
        width={200}
      >
        <InputDate label='納品日' />
        <InputDate label='請求締め日' />
        <InputDate label='支払日' />
      </Stack>

      <Stack width={300} spacing={2}>
        <InfoFields label='発注合計金額' />
        <InvoiceAmount />
        <InfoFields label='消費税' />
        <InfoFields label='税込金額' />
      </Stack>

    </Stack>
  );
};