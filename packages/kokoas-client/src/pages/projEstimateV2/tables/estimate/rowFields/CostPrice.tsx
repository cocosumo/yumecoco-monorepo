import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const CostPrice = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeCostPrice']

}) => {

  const { register } = useFormContext<TypeOfForm>();

  return (
    <OutlinedMoneyInput {...register(getItemsFieldName(rowIdx, 'costPrice'), {
      onChange: () => handleChange(rowIdx),
    })}
    />
  );
};