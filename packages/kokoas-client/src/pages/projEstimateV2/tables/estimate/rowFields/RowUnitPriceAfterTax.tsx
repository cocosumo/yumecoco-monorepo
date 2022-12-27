import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const RowUnitPriceAfterTax = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number,
  handleChange: UseSmartHandlers['handleChangeRowUnitPriceAfterTax']
}) => {
  const { register } = useFormContext<TypeOfForm>();

  return (
    <OutlinedMoneyInput {...register(
      getItemsFieldName(rowIdx, 'rowUnitPriceAfterTax'),
      {
        onChange: () => handleChange(rowIdx),
        //disabled: !!envStatus || !+(costPrice ?? 0),
      })
    }
    />
  );
};