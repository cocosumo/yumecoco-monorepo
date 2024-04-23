import { RenderCellProps } from 'react-data-grid';
import { Chip, styled } from '@mui/material';
import { RowItem } from '../useColumns';
import { KOrderProgress, KProgress } from 'types/src/common/order';
import { blueGrey, green, lightGreen, orange, blue, yellow } from '@mui/material/colors';
import { useSetAtom } from 'jotai';
import { invoiceDialogAtom } from '../../invoiceForm/InvoiceFormDialog';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { useCallback } from 'react';

const statusBGcolorMap: Record<KProgress, string> = {
  未発注: blueGrey[50],
  発注済: blue[600],
  請求済: orange[600],
  請求承認済: yellow[600],
  請求確認済: lightGreen[600],
  支払済: green[600],
};

const statusFGcolorMap: Record<KProgress, string> = {
  未発注: blueGrey[600],
  発注済: blue[50],
  請求済: orange[50],
  請求承認済: yellow[50],
  請求確認済: lightGreen[50],
  支払済: green[50],
};

const CustomChip = styled(Chip)(({ label, onClick }) => ({
  backgroundColor: statusBGcolorMap[label as KOrderProgress],
  color: statusFGcolorMap[label as KOrderProgress],
  borderRadius: 4,
  height: 24,
  width: '100%',
  '&:hover': onClick 
    ? {
      backgroundColor: statusBGcolorMap[label as KOrderProgress],
      filter: 'brightness(120%)',
    } 
    : undefined,
  
  cursor: onClick ? 'pointer' : 'not-allowed',
}));

const RenderStatus = (props: RenderCellProps<RowItem>) => {
  const { getValues } = useTypedFormContext();
  const setInvoiceDialogAtom = useSetAtom(invoiceDialogAtom);
  
  const { row } = props;

  const handleClick =  useCallback(() => {
    setInvoiceDialogAtom({ 
      open: true,
      orderId: row.orderId, 
      projId: getValues('projId'), 
      projName: getValues('projName'),
      storeName: getValues('storeName'),
    });

  }, [
    row,
    getValues,
    setInvoiceDialogAtom,
  ]);

  const isProcessingOrder = row.status !== '未発注';

  return (
    <CustomChip 
      size={'small'}
      label={row.status}
      onClick={isProcessingOrder ? handleClick : undefined}
    />
  );
};

export const renderStatus = (props: RenderCellProps<RowItem>) => {

  if (!props.row.status) {
    return null;
  }

  return (
    <RenderStatus {...props} />
  );
};