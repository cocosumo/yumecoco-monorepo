import { Box, Chip, Stack, Typography } from '@mui/material';
import { IInvoices } from 'types';
import NumbersIcon from '@mui/icons-material/Numbers';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import { format, parseISO } from 'date-fns';
import { ReactNode } from 'react';
import { TInvoiceStatus } from '../../../form';


const TextWithIcon = ({
  Icon,
  label,
  width,
  align = 'left',
}: {
  Icon: ReactNode
  label: string
  width: string
  align?: 'left' | 'center' | 'right'
}) => {
  return (
    <Stack spacing={0} direction={'row'} width={width}>
      {Icon}
      <Typography textAlign={align} width={'80%'}>
        {label}
      </Typography>
    </Stack>
  );
};


type InvStatusJa = {
  [key in TInvoiceStatus]: string;
};

const invoiceStatusJa: InvStatusJa = {
  'created': '作成済み',
  'sent': '発行済み',
  'voided': '破棄',
  'completed': '完了',
  '': '',
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
    <Stack
      direction={'row'}
      spacing={2}
      alignItems="center"
      justifyContent="space-around"
      width={'100%'}
    >

      <TextWithIcon Icon={<NumbersIcon />} label={id.value} width='15%' />

      <TextWithIcon
        Icon={<ScheduleIcon />}
        label={format(parseISO(dateCreated), 'yyyy/MM/dd')}
        width='30%'
      />

      <TextWithIcon
        Icon={<CurrencyYenIcon />}
        label={Math.round(+billingAmount).toLocaleString()}
        width='30%'
        align='right'
      />

      <Box width={'25%'}>
        {!!invoiceStatus &&
          <Chip
            label={invoiceStatusJa[invoiceStatus as TInvoiceStatus]}
            color={'info'}
            size={'small'}
          />}
      </Box>

    </Stack>
  );
};

