import { RenderCellProps } from 'react-data-grid';
import { Chip, styled } from '@mui/material';
import { RowItem } from '../useColumns';
import { KInvoiceProgress, KOrderProgress, KProgress, invoiceProgress } from 'types/src/common/order';
import { useSetAtom } from 'jotai';
import { invoiceDialogAtom } from '../../invoiceForm/InvoiceFormDialog';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { useCallback, useMemo } from 'react';
import { statusBGcolorMap } from 'kokoas-client/src/lib/progressColors';
import { InvoiceB2BStatusMapByProjIdReturn } from 'kokoas-client/src/hooksQuery';


const CustomChip = styled(Chip)(({ label, onClick }) => ({
  backgroundColor: statusBGcolorMap[label as KOrderProgress],
  color: 'white',
  textShadow: '1px 1px 1px rgba(0,0,0,0.9)',
  borderRadius: 4,
  height: 24,
  letterSpacing: 1,
  width: '100%',
  '&:hover': onClick 
    ? {
      backgroundColor: statusBGcolorMap[label as KOrderProgress],
      filter: 'brightness(120%)',
      
    } 
    : undefined,
  
  cursor: onClick ? 'pointer' : 'not-allowed',
}));

export type RenderStatusParams = RenderCellProps<RowItem> & {
  invoiceStatusMap ?: InvoiceB2BStatusMapByProjIdReturn;
};

const RenderStatus = (props: RenderStatusParams) => {
  const { getValues } = useTypedFormContext();
  const setInvoiceDialogAtom = useSetAtom(invoiceDialogAtom);
  
  const { 
    row,
    invoiceStatusMap,
  } = props;

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

  const {
    status,
    backgroundImage,
  } = useMemo(() => {

      
    if (!row.orderId) {
      return {
        status: '未発注',
      };
    }

    const invoiceStatus = invoiceStatusMap?.[row.orderId];

    if (!invoiceStatus) {
      return {
        status: row.status,
      };
    }

    const totalInvoices = Object.values(invoiceStatus).reduce((acc, cur) => acc + cur, 0);

    const colors : string[] = [];
    let percentage = 0;
    for (const key of invoiceProgress) {
      const value = invoiceStatus[key as KInvoiceProgress];
      if (value) {
        percentage += value / totalInvoices * 100;
        colors.push(`${statusBGcolorMap[key as KProgress]} ${percentage}%`);
      }
    }

    if (colors.length === 1) {
      return {
        status: Object.keys(invoiceStatus)[0],
      };
    }

    const bgImageColor = `linear-gradient(to right, ${colors.join(',')})`;

    return {
      status: '請求有',
      backgroundImage: bgImageColor,
    };
    
  }, [
    invoiceStatusMap,
    row.orderId,
    row.status,
  ]);


  return (
    <CustomChip 
      size={'small'}
      label={status}
      onClick={isProcessingOrder ? handleClick : undefined}
      sx={{
        backgroundImage,
      }}
    />
  );
};

export const renderStatus = (props: RenderStatusParams) => {

  if (!props.row.status) {
    return null;
  }

  return (
    <RenderStatus {...props} />
  );
};