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
  const { register, control } = useFormContext<TypeOfForm>();

  const [
    costPrice,
    envStatus,
  ] = useWatch({
    name: [
      getItemsFieldName(rowIdx, 'costPrice'),
      'envStatus',
    ],
    control,
  });


  return (
    <OutlinedMoneyInput
      {...register(
        getItemsFieldName(rowIdx, 'rowUnitPriceAfterTax'),
        {
          onChange: () => handleChange(rowIdx),
        })
      }
      disabled={!!envStatus || !+(costPrice ?? 0)}
      onFocus={({ target }) => target.select()}
    />
  );
};