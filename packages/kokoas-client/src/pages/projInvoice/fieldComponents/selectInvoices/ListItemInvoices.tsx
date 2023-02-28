import { Chip, Stack, Typography } from '@mui/material';
import { IInvoices } from 'types';
import NumbersIcon from '@mui/icons-material/Numbers';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import { format, parseISO } from 'date-fns';
import { ReactNode } from 'react';


const TextWithIcon = ({
  Icon,
  label,
}: {
  Icon: ReactNode,
  label: string
}) => {
  return (
    <Stack spacing={0} direction={'row'}>
      {Icon}
      <Typography>
        {label}
      </Typography>
    </Stack>
  );
};


export const ListItemInvoices = ({
  invoiceRecord,
}: {
  invoiceRecord: IInvoices
}) => {

  const {
    $id: id,
    invoiceStatus: { value: invoiceStatus },
    issuedDateTime: { value: dateCreated },
    billingAmount: { value: billingAmount },
  } = invoiceRecord;


  return (
    <Stack direction={'row'} spacing={2}
      alignItems="center" justifyContent="space-around"
    >

      <TextWithIcon Icon={<NumbersIcon />} label={id.value} />

      <TextWithIcon Icon={<ScheduleIcon />} label={format(parseISO(dateCreated), 'yyyy/MM/dd')} />

      <TextWithIcon
        Icon={<CurrencyYenIcon />}
        label={Math.round(+billingAmount).toLocaleString()}
      />

      {!!invoiceStatus &&
        <Chip label={invoiceStatus} color={'info'} size={'small'} />}

    </Stack>
  );
};

