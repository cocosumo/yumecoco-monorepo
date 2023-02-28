import { DialogContent, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { GetInvoicesByCustGroupId, useInvoicesByCustGroupId } from 'kokoas-client/src/hooksQuery';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { ListItemInvoices } from './ListItemInvoices';
import { TInvoiceStatus } from '../../../form';

export interface InvoicesDialogContentProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  custGroupId: string
  value: string
}

export const InvoicesDialogContent = (props: InvoicesDialogContentProps) => {
  const { onChange, custGroupId, value } = props;

  const { data } = useInvoicesByCustGroupId<GetInvoicesByCustGroupId>(custGroupId);

  const { records: recInvoices } = data || {};


  /**
   * 選択肢の生成
   */
  const actualOptions: OptionNode[] = recInvoices
    ?.filter(({ invoiceStatus }) => {
      return invoiceStatus.value as TInvoiceStatus !== 'voided';
    })
    .map<OptionNode>((rec) => {
    const { uuid } = rec;

    return {
      value: uuid.value,
      key: uuid.value,
      component: (<ListItemInvoices invoiceRecord={rec} />),
    };
  }) || [];



  return (
    <DialogContent
      dividers
      sx={{ width: '450px' }}
    >
      {Boolean(actualOptions.length) &&
        <RadioGroup
          name={'invoice'}
          aria-label={'invoice'}
          value={value}
          onChange={onChange}
          sx={{ width: '100%' }}
        >
          {actualOptions?.map((option) => {

            return (
              <FormControlLabel
                key={option.key}
                value={option.value}
                control={<Radio />}
                label={option.component}
                sx={{ width: '100%' }}
                disableTypography
              />
            );
          })}

        </RadioGroup>}


      {!actualOptions.length &&
        <Stack direction={'row'} spacing={1}>
          <WarningAmberIcon />
          <Typography variant='body2'>
            見積もりはまだ作成されていません
          </Typography>
        </Stack>}

    </DialogContent>
  );
};