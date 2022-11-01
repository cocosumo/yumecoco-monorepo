import { Box } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { manualMenusWidth } from './HelpComponents';
import AboutKokoas from './menus/AboutKokoas';
import ConstructionHelpMenu from './menus/ConstructionHelpMenu';
import ContractHelpMenu from './menus/ContractHelpMenu';
import CostomerHelpMenu from './menus/CostomerHelpMenu';
import HelpHeader from './menus/HelpHeader';


export default function ManualMenus() {
  return (
    <Box sx={{
      display:'flex',
      flexDirection: 'column',
      width: manualMenusWidth,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: manualMenusWidth,
        boxSizing: 'border-box',
      },
    }}>
      <HelpHeader />
      <Divider />
      <List>
        <AboutKokoas />
      </List>
      <Divider />
      <List>
        <CostomerHelpMenu />
        <ConstructionHelpMenu />
        <ContractHelpMenu />
      </List>
      <Divider />
    </Box>
  );
}