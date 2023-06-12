import { Divider, List, ListSubheader, Paper } from '@mui/material';
import { ListItemLayout } from './ListItemLayout';




export const ContractList = () => {
  return (
    <List
      sx={{
        bgcolor: 'background.paper',
        height: '60vh',
        overflow: 'auto',
        pt: 0,
        minWidth: '200px',
        position: 'absolute',
        top: 100,
        left: 20,
      }}
      component={Paper}
    >
      <ListSubheader>
        <ListItemLayout
          status={'状態'}
          contractDate={'契約日'}
          contractAmount={'契約金額'}
        />
      </ListSubheader>
      <Divider />

      

    </List>
  );
};