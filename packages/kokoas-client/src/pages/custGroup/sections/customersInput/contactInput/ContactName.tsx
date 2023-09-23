import { ControlledTextField } from '../../../fields/ControlledTextField';
import { useTypedWatch } from '../../../hooks/useTypedHooks';
import { KFormCustomer } from '../../../schema';

export const ContactName = ({
  name,
  relFieldName,
  index,
}:{
  index: number,
  relFieldName: KFormCustomer,
  name: KFormCustomer,
}) => {
  
  const relField  = useTypedWatch({
    name: `customers.${index}.${relFieldName}`,
  });

  console.log(relField);
  if (!relField || relField === '契約者') return null;

  return (
    <ControlledTextField
      name={`customers.${index}.${name}`}
      label={'氏名'}
      placeholder={'山田太郎'}
      width={200}
    />
  );
};