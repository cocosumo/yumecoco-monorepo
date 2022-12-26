import { MoneyField } from 'kokoas-client/src/components/reactHookForm/MoneyField';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';

export const CostPrice = ({
  rowIdx,
}: {
  rowIdx: number
}) => {

  const { control } = useFormContext<TypeOfForm>();

  return (
    <MoneyField
      controllerProps={{
        name: getItemsFieldName(rowIdx, 'costPrice'),
        control,
      }}
      textFieldProps={{ size: 'small' }}
    />
  );
};