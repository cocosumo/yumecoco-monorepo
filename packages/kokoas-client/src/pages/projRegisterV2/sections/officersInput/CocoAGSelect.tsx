
import { KForm } from '../../schema';
import { ControlledEmployeeSelector } from './ControlledEmployeeSelector';

export const CocoAGSelect = ({
  name,
  required,
}:{
  name: KForm,
  required?: boolean,
}) => {

  return (
    <ControlledEmployeeSelector
      name={name}
      affiliation={['ここすも']}
      required={required}
    />
    
  );
};


