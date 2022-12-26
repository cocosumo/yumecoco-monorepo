import { PercentField } from 'kokoas-client/src/components/reactHookForm';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';

export const ProfitRate = ({
  rowIdx,
}: {
  rowIdx: number
}) => {
  const { control } = useFormContext<TypeOfForm>();

  return (
    <PercentField
      controllerProps={{
        name: getItemsFieldName(rowIdx, 'materialProfRate'),
        control,
      }}
      textFieldProps={{ size: 'small' }}
    />
  );
};