import { RenderCellProps } from 'react-data-grid';
import { Chip, styled } from '@mui/material';
import { RowItem } from '../useColumns';
import { KOrderProgress } from 'types/src/common/order';
import { useSetAtom } from 'jotai';
import { invoiceDialogAtom } from '../../invoiceForm/InvoiceFormDialog';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { useCallback } from 'react';
import { statusBGcolorMap, statusFGcolorMap } from 'kokoas-client/src/lib/progressColors';


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