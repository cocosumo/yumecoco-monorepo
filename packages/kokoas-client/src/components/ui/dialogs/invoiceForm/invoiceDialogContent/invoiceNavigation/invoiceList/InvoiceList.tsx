import { List, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { ListItemLayout } from './ListItemLayout';
import { v4 } from 'uuid';
import { useInvoiceFormContext } from '../../../hooks/useInvoiceRHF';
import { useWatch } from 'react-hook-form';
import { useInvoiceB2BByProjId } from 'kokoas-client/src/hooksQuery';
import { useMemo } from 'react';
import { invoiceDialogAtom } from '../../../InvoiceFormDialog';
import { useSetAtom } from 'jotai';
import AddIcon from '@mui/icons-material/Add';
import { IInvoiceb2b } from 'types';
import { statusBGcolorMap } from 'kokoas-client/src/lib/progressColors';
import { KProgress } from 'types/src/common/order';


export const InvoiceList = () => {
  const setInvoiceDialogAtom = useSetAtom(invoiceDialogAtom);
  const { control } = useInvoiceFormContext();
  const [
    projId,
    orderId,
    invoiceId,
  ] = useWatch({
    control,
    name: ['projId', 'orderId', 'invoiceId'],
  });

  const { data } = useInvoiceB2BByProjId<IInvoiceb2b[]>({ projId });

  const invoiceList = useMemo(() => {
    if (!data || !orderId) return [];

    return data.filter((d) => d.orderId.value === orderId);
  }, [data, orderId]);

  return (
    <List
      sx={{
        flexGrow: 1,
        overflowY: 'scroll',
        p: 0,
      }}
    >
      <ListSubheader 
        sx={{
          py: 1,
          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.12)',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        }}
      >
        <ListItemLayout
          invoiceDueDate={'請求締め日'}
          invoiceAmount={'請求金額 (税抜)'}
        />
      </ListSubheader>

      {invoiceList.map((d) => (

        <ListItemButton
          key={d.uuid.value || v4()}
          selected={d.uuid.value === invoiceId}
          onClick={() => {
            setInvoiceDialogAtom((prev) => ({
              ...prev,
              open: true,
              invoiceId: d.uuid.value,
            }));
          }} 
          sx={{
            borderLeft: `6px solid ${statusBGcolorMap[d.invoiceStatus.value as KProgress]}`,
          }}
          divider
        >
          <ListItemLayout
            invoiceDueDate={d.invoiceDueDate.value}
            invoiceAmount={Number(d.invoiceAmount.value).toLocaleString()}
          />
        </ListItemButton>
      ))}

      <ListItemButton
        divider
        selected={!invoiceId}
        onClick={() => {
          setInvoiceDialogAtom((prev) => ({
            ...prev,
            open: true,
            invoiceId: '',
          }));
        }}
      >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary="新規請求書" />
      </ListItemButton>

    </List>
  );
};