import { DialogContent, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { GetInvoicesByCustGroupId, useInvoicesByCustGroupId } from 'kokoas-client/src/hooksQuery';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { ListItemInvoices } from './ListItemInvoices';
import { TInvoiceStatus } from '../../form';

export interface InvoicesDialogContentProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  custGroupId: string
  value: string
}

export const InvoicesDialogContent = (props: InvoicesDialogContentProps) => {
  const { name, onChange, custGroupId, value } = props;

  const { data } = useInvoicesByCustGroupId(custGroupId);

  const { records: recInvoices } = data as GetInvoicesByCustGroupId; // 要修正


  /**
   * 選択肢の生成
   */
  const actualOptions: OptionNode[] = recInvoices?.filter(({ invoiceStatus }) => {
    return invoiceStatus.value as TInvoiceStatus !== 'voided';
  }).map<OptionNode>((rec) => {
    const { uuid } = rec;

    return {
      value: uuid.value,
      key: uuid.value,
      component: (<ListItemInvoices invoiceRecords={rec} />),
    };
  }) || [];



  return (
    <DialogContent dividers>
      {Boolean(actualOptions.length) &&
        <RadioGroup
          name={name}
          aria-label={name}
          value={value}
          onChange={onChange}
        >
          {actualOptions?.map((option) => {

            return (
              <FormControlLabel
                key={option.key}
                value={option.value}
                control={<Radio />}
                label={option.component}
              />
            );
          })}

        </RadioGroup>}


      {!(actualOptions.length) &&
        <Stack direction={'row'} spacing={1}>
          <WarningAmberIcon />
          <Typography variant='body2'>
            見積もりはまだ作成されていません
          </Typography>
        </Stack>}

    </DialogContent>
  );
};