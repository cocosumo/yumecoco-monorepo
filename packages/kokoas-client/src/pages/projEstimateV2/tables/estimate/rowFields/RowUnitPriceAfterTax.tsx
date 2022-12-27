import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const RowUnitPriceAfterTax = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number,
  handleChange: UseSmartHandlers['handleChangeRowUnitPriceAfterTax']
}) => {
  const { control, register } = useFormContext<TypeOfForm>();

  const [
    costPrice,
    envStatus,
  ] = useWatch({
    name: [
      getItemsFieldName<'items.0.costPrice'>(rowIdx, 'costPrice'),
      'envStatus',
    ],
    control,
  });

  return (
    <OutlinedMoneyInput {...register(
      getItemsFieldName(rowIdx, 'rowUnitPriceAfterTax'),
      {
        onChange: handleChange,
        disabled: !!envStatus || !+(costPrice ?? 0),
      })
    }
    />
  );
};