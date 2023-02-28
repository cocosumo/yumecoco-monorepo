import { Button, DialogContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { GetInvoicesByCustGroupId, useInvoicesByCustGroupId } from 'kokoas-client/src/hooksQuery';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { TInvoiceStatus } from '../../form';
import { ListItemInvoicesButton } from './ListItemInvoicesButton';

export interface InvoicesDialogButtonContentProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  custGroupId: string
  value: string
}

export const InvoicesDialogButtonContent = (props: InvoicesDialogButtonContentProps) => {
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
      component: (<ListItemInvoicesButton invoiceRecord={rec} />),
    };
  }) || [];



  return (
    <DialogContent
      dividers
      sx={{ width: '450px' }}
    >
      {Boolean(actualOptions.length) &&
        actualOptions?.map((option) => {

          return (
            <Button
              key={option.key}
              variant='outlined'
              sx={{ width: '100%' }}
            >
              {option.component}
            </Button>
          );
        })}


      {
        !actualOptions.length &&
        <Stack direction={'row'} spacing={1}>
          <WarningAmberIcon />
          <Typography variant='body2'>
            見積もりはまだ作成されていません
          </Typography>
        </Stack>
      }

    </DialogContent >
  );
};