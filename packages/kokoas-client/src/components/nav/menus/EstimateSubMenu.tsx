import { CollapsibleList } from './common/CollapsibleList';
import { EstimateSubMenuRegister } from './EstimateSubMenuRegister';



export const EstimateSubMenu = ({
  open,
}: { open: boolean }) => {
  return (
    <CollapsibleList open={open}>
      <EstimateSubMenuRegister />
    </CollapsibleList>
  );
};