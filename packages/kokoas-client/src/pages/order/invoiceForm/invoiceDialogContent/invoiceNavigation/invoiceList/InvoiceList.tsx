import { List, ListItem, ListItemButton, ListSubheader } from '@mui/material';
import { ListItemLayout } from './ListItemLayout';
import { v4 } from 'uuid';

const sampleData = Array.from({ length: 100 }, (_, i) => ({
  invoiceDeadlineDate: '2022/10/01',
  invoiceAmount: 1000000 * (i + 1),
}));

export const InvoiceList = () => {
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
          invoiceDeadlineDate={'請求締め日'}
          invoiceAmount={'請求金額 (税抜)'}
        />
      </ListSubheader>

      {sampleData.map((data) => (
        <ListItem key={v4()} disablePadding>
          <ListItemButton divider>
            <ListItemLayout
              invoiceDeadlineDate={data.invoiceDeadlineDate}
              invoiceAmount={data.invoiceAmount.toLocaleString()}
            />
          </ListItemButton>
        </ListItem>
      ))}

    </List>
  );
};