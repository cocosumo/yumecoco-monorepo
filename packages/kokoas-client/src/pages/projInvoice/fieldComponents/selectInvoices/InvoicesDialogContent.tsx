import { Button, DialogContent, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { GetInvoicesByCustGroupId, useInvoicesByCustGroupId } from 'kokoas-client/src/hooksQuery';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { TInvoiceStatus } from '../../form';
import { ListItemInvoices } from './ListItemInvoices';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useNavigate } from 'react-router-dom';

export interface InvoicesDialogContentProps {
  onClose: () => void;
  custGroupId: string
}

export const InvoicesDialogContent = (props: InvoicesDialogContentProps) => {
  const { onClose, custGroupId } = props;
  const navigate = useNavigate();

  const { data } = useInvoicesByCustGroupId<GetInvoicesByCustGroupId>(custGroupId);

  const { records: recInvoices } = data || {};


  const handleClick = (newInvoiceId: string | number) => {
    navigate(`${pages.projInvoice}?${generateParams({ invoiceId: newInvoiceId.toString() })}`);
    onClose();
  };


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
        actualOptions?.map((option) => {

          return (
            <Button
              key={option.key}
              variant='outlined'
              sx={{ 
                width: '100%',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}
              onClick={() => { handleClick(option.value); }}
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