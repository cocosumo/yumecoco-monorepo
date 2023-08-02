import Divider from '@mui/material/Divider';


import KintoneButton from '../ui/buttons/KintoneButton';

import SystemMenu from './menus/SystemMenu';
//import { ConstructionMenu } from './menus/ConstructionMenu';
//import PaymentMenu from './menus/PaymentMenu';
import packageInfo from 'kokoas-client/src/lib/packageInfo';
import { Typography } from '@mui/material';
//import { ProspectMenu } from './menus/ProspectMenu';
import { Registrations } from './menus/registrations/Registrations';
import { Search } from './menus/search/Search';
import CustomerMenu from './menus/CustomerMenu';
import ContractMenu from './menus/ContractMenu';
import { ConstructionMenu } from './menus/ConstructionMenu';

export default function MainMenu() {
  return (
    <div>
      <CustomerMenu />
      <ConstructionMenu />
      <ContractMenu />
      {/*  <Registrations /> */}
      {/* <Search /> */}
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