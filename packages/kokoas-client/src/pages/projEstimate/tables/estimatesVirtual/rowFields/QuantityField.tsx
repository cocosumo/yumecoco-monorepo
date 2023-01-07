import { OutlinedNumberInput } from 'kokoas-client/src/components/reactHookForm/OutlinedNumberInput';
import { useEstField } from '../../../hooks/useEstField';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';
import { UnitType } from './UnitType';

export const QuantityField = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number,
  handleChange: UseSmartHandlers['handleChangeQuantity']
}) => {


  const { 
    formContext: { register }, 
    fieldName,
    ...fieldProps
  } = useEstField({
    fieldName: 'quantity',
    rowIdx,
  });

  return (
    
    <OutlinedNumberInput
      {...fieldProps}
      {...register(
        fieldName, 
        {
          onChange: () => handleChange(rowIdx),
        },
      )}
      inputProps={{
        style: { textAlign: 'left' },
      }}
      endAdornment={(<UnitType rowIdx={rowIdx} /> )}
    />

  );
};