import Divider from '@mui/material/Divider';


import KintoneButton from '../ui/buttons/KintoneButton';

import SystemMenu from './menus/SystemMenu';

import packageInfo from 'kokoas-client/src/lib/packageInfo';
import { Typography } from '@mui/material';
import CustomerMenu from './menus/CustomerMenu';
import ContractMenu from './menus/ContractMenu';
import { ConstructionMenu } from './menus/ConstructionMenu';
import OrderMenu from './menus/OrderMenu';
import { isShowDev } from 'kokoas-client/src/config/settings';
import PaymentMenu from './menus/PaymentMenu';

export default function MainMenu() {
  return (
    <div>
      <CustomerMenu />
      <ConstructionMenu />
      <ContractMenu />
      <OrderMenu />
      {isShowDev && <PaymentMenu />}

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