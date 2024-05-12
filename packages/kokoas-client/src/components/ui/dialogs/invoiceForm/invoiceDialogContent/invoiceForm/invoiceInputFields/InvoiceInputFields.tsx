import { Stack } from '@mui/material';
import { InputDate } from '../../../common/InputDate';
import { InvoiceAmount } from './InvoiceAmount';
import { InfoFields } from './InfoFields';
import { useItemsSummary } from '../../../hooks/useItemsSummary';

export const InvoiceInputFields = () => {

  const {
    totalTaxAmount,
    totalAmountBeforeTax,
    totalAmountAfterTax,
  } = useItemsSummary();

  return (
    <Stack
      direction={'row'}
      spacing={4}
    >
      <Stack
        spacing={2}
        width={200}
      >
        <InputDate label='納品日' name={'deliveryDate'} />
        <InputDate label='請求締め日' name={'invoiceDueDate'} />
        <InputDate label='支払日' name={'paymentDate'} />
      </Stack>

      <Stack width={250} spacing={2}>
        <InfoFields label='発注合計金額' value={totalAmountBeforeTax} />
        <InvoiceAmount />
        <InfoFields label='消費税' value={totalTaxAmount} />
        <InfoFields label='税込金額' value={totalAmountAfterTax} />
      </Stack>

    </Stack>
  );
};