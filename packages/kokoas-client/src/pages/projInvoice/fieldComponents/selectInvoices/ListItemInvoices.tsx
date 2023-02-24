import { Chip, Stack, SvgIconTypeMap, Typography } from '@mui/material';
import { IInvoices } from 'types';
import NumbersIcon from '@mui/icons-material/Numbers';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CurrencyYenIcon from '@mui/icons-material/CurrencyYen';
import { OverridableComponent } from '@mui/types';
import { format, parseISO } from 'date-fns';


const ListContent = ({
  Icon,
  explanation,
}: {
  Icon: OverridableComponent<SvgIconTypeMap<Record<string, unknown>, 'svg'>>,
  explanation: string
}) => {
  return (
    <Stack spacing={0} direction={'row'}>
      <Icon />
      <Typography>
        {explanation}
      </Typography>
    </Stack>
  );
};


export const ListItemInvoices = ({
  invoiceRecords,
}: {
  invoiceRecords: IInvoices
}) => {

  const {
    $id: id,
    invoiceStatus: { value: invoiceStatus },
    issuedDateTime: { value: dateCreated },
    billingAmount: { value: billingAmount },
  } = invoiceRecords;


  return (
    <Stack direction={'row'} spacing={2}
      alignItems="center" justifyContent="space-around"
    >

      <ListContent Icon={NumbersIcon} explanation={String(id.value)} />

      <ListContent Icon={ScheduleIcon} explanation={format(parseISO(dateCreated), 'yyyy/MM/dd')} />

      <ListContent
        Icon={CurrencyYenIcon}
        explanation={Math.round(+billingAmount).toLocaleString()}
      />

      {!!invoiceStatus &&
        <Chip label={invoiceStatus} color={'info'} size={'small'} />}

    </Stack>
  );
};

