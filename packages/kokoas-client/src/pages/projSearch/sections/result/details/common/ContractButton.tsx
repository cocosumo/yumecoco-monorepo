
import { FaFileSignature } from '@react-icons/all-files/fa/FaFileSignature';
import { ActionButton, ActionButtonProps } from './ActionButton';


export const ContractButton = (props:ActionButtonProps) => {
  return (
    <ActionButton
      {...props}
      startIcon={<FaFileSignature />}
    >
      契約
    </ActionButton>
  
  );
};