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

export default function MainMenu() {
  return (
    <div>

      <Search />

      <Registrations />


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