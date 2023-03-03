import { Box, Button, DialogContent, Tooltip, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { GetInvoicesByCustGroupId, useInvoicesByCustGroupId } from 'kokoas-client/src/hooksQuery';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { TInvoiceStatus } from '../../form';
import { ListItemInvoice } from './ListItemInvoice';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useNavigate } from 'react-router-dom';
import { ReactNode } from 'react';
import { Caption } from 'kokoas-client/src/components';


/**
 * 選択肢の生成
 */
type InvoiceOption = {
  value: string,
  key: string,
  component: ReactNode,
  tipComponent: ReactNode,
};


export interface InvoicesDialogContentProps {
  onClose: () => void;
  custGroupId: string
}

export const InvoicesDialogContent = (props: InvoicesDialogContentProps) => {
  const { onClose, custGroupId } = props;
  const navigate = useNavigate();

  const { data } = useInvoicesByCustGroupId<GetInvoicesByCustGroupId>(custGroupId);

  const { records: recInvoices } = data || {};


  const handleClick = (newInvoiceId: string) => {
    navigate(`${pages.projInvoice}?${generateParams({ invoiceId: newInvoiceId })}`);
    onClose();
  };

  const actualOptions: InvoiceOption[] = recInvoices
    ?.filter(({ invoiceStatus }) => {
      return invoiceStatus.value as TInvoiceStatus !== 'voided';
    })
    ?.map<InvoiceOption>((rec) => {
    const {
      uuid,
      estimateLists,
    } = rec;

    const infoToolTip = (
      <Box>
        {estimateLists.value.map(({ value }) => {
          return (
            <Caption
              text={`見積もり枝番：${value.dataId.value} 請求金額：${value.amountPerContract.value}`}
              key={`${value.dataId.value}tooltipInfo`}
            />);
        })}
      </Box>);

    return {
      value: uuid.value,
      key: uuid.value,
      component: (<ListItemInvoice invoiceRecord={rec} />),
      tipComponent: infoToolTip,
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

            <Tooltip title={option.tipComponent} key={`${option.value}tooltip`}>
              <Button
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
            </Tooltip>
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