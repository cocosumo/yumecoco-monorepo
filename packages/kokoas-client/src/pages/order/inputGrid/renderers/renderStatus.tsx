import { RenderCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { KInvoiceProgress, KProgress, invoiceProgress } from 'types/src/common/order';
import { useSetAtom } from 'jotai';
import { useTypedFormContext } from '../../hooks/useTypedRHF';
import { useCallback, useMemo } from 'react';
import { statusBGcolorMap } from 'kokoas-client/src/lib/progressColors';
import { InvoiceB2BStatusMapByProjIdReturn } from 'kokoas-client/src/hooksQuery';
import { invoiceDialogAtom } from 'kokoas-client/src/components/ui/dialogs/invoiceForm/InvoiceFormDialog';
import { ProgressStatusChip } from 'kokoas-client/src/components/ui/chips/ProgressStatusChip';


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
    <ProgressStatusChip 
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