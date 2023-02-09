import Divider from '@mui/material/Divider';

import List from '@mui/material/List';

import KintoneButton from '../ui/buttons/KintoneButton';
import CustomerMenu from './menus/CustomerMenu';
import ContractMenu from './menus/ContractMenu';
import SystemMenu from './menus/SystemMenu';
import { ConstructionMenu } from './menus/ConstructionMenu';
import EstimateMenu from './menus/EstimateMenu';
import PaymentMenu from './menus/PaymentMenu';
import packageInfo from 'kokoas-client/src/lib/packageInfo';
import { Typography } from '@mui/material';

export default function MainMenu() {
  return (
    <div>

      <Divider />
      <List>
        <CustomerMenu />
        <ConstructionMenu />
        <EstimateMenu />
        {/* <CustomerManagementMenu /> */}
        <ContractMenu />
        <PaymentMenu />
        <ClaimBox />
      </List>
      <Divider />
      <SystemMenu />
      <Divider />
      <KintoneButton />
      <Typography variant={'caption'} textAlign={'center'} component={'div'}>
        {`V${packageInfo.version}`}
      </Typography>

    </div>
  );
}