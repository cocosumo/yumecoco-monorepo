import Divider from '@mui/material/Divider';

import List from '@mui/material/List';

import KintoneButton from '../ui/buttons/KintoneButton';
import CustomerMenu from './menus/CustomerMenu';
import ContractMenu from './menus/ContractMenu';
import SystemMenu from './menus/SystemMenu';
import ConstructionMenu from './menus/ConstructionMenu';
import EstimateMenu from './menus/EstimateMenu';

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
        {/* 入金管理メニューを追加する */}
      </List>
      <Divider />
      <SystemMenu />
      <Divider />
      <KintoneButton />
    </div>
  );
}