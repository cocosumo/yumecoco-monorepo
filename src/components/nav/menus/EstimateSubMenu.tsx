import { Collapse, List } from '@mui/material';
import { EstimateSubMenuRegister } from './EstimateSubMenuRegister';



export const EstimateSubMenu = ({
  open,
}: { open: boolean }) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        <EstimateSubMenuRegister />
      </List>
    </Collapse>
  );
};