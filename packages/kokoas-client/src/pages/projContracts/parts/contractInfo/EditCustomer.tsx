
import { pages } from '../../../Router';
import { GoToOtherEditPage } from './Edit';

export const EditCustomer = () => (
  <GoToOtherEditPage
    route={pages.custGroupEdit}
    tooltipTitle="顧客を編集する画面にいく"
  />
);