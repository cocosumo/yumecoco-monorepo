import { OutlinedMoneyInput } from 'kokoas-client/src/components/reactHookForm/OutlinedMoneyInput';
import { useWatch } from 'react-hook-form';
import { getItemsFieldName } from '../../../form';
import { useEstField } from '../../../hooks/useEstField';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

/** @deprecated インボイス制度で、廃止するかもしれません。決まるまで残しておきます。 */
export const RowUnitPriceAfterTax = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number,
  handleChange: UseSmartHandlers['handleChangeRowUnitPriceAfterTax']
}) => {
  const {
    formContext: { register, control },
    fieldName,
    ...fieldProps
  } = useEstField({
    fieldName: 'rowUnitPriceAfterTax',
    rowIdx,
  });

  const [
    quantity,
    envStatus,
  ] = useWatch({
    name: [
      getItemsFieldName(rowIdx, 'quantity'),
      'envStatus',
    ],
    control,
  });

  return (
    <OutlinedMoneyInput
      {...fieldProps}
      {...register(
        fieldName,
        {
          onChange: () => handleChange(rowIdx),
        })
      }
      disabled={!!envStatus || !+(quantity ?? 0)}
    />
  );
};