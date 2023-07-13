
import { KForm } from '../../schema';
import { ControlledEmployeeSelector } from './ControlledEmployeeSelector';

export const CocoConstSelect = ({
  name,
}:{
  name: KForm,
}) => {

  return (
    <ControlledEmployeeSelector
      name={name}
      affiliation={['ここすも']}
    />
    
  );
};