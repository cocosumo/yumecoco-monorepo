
import { KForm } from '../../schema';
import { ControlledEmployeeSelector } from './ControlledEmployeeSelector';

export const YumeAGSelect = ({
  name,
  required,
}:{
  name: KForm,
  required?: boolean,
}) => {

  return (
    <ControlledEmployeeSelector
      name={name}
      affiliation={['ゆめてつ']}
      required={required}
    />
    
  );
};