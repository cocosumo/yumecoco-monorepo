import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const UnitPrice = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeUnitPrice']
}) => {

  const {
    register,
  } = useFormContext<TypeOfForm>();

  return (
    <OutlinedMoneyInput {...register(
      getItemsFieldName(rowIdx, 'unitPrice'),
      {
        onChange: () => handleChange(rowIdx),
      })
    }
    />

  );
};