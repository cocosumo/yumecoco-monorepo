
import { pages } from '../../../Router';
import { GoToOtherEditPage } from './Edit';

export const EditProject = () => (
  <GoToOtherEditPage
    route={pages.projEdit}
    tooltipTitle="工事情報を編集する画面にいく"
  />
);