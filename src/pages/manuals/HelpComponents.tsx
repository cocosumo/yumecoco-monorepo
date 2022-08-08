import { Divider } from '@mui/material'; /* , Drawer, List, Toolbar, useMediaQuery  */
// import { styled, useTheme } from '@mui/material/styles';
import ManualMenus from './ManualMenus';
import FunctionHelp from './menus/FunctionHelp';
// import HelpHeader from './menus/HelpHeader';
import ManualRouter from './ManualRouter';

/* const menuWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));
 */
export default function HelpComponents() {
  // const theme = useTheme();
  // const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  
  return (
    <>
      <ManualRouter />
      <Divider />
      <ManualMenus />
      <Divider />
      <FunctionHelp />
    </>
  );
}