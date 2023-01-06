import { OutlinedPercentInput } from 'kokoas-client/src/components/reactHookForm/OutlinedPercentInput';
import { useEstField } from '../../../hooks/useEstField';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const ProfitRate = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeProfitRate']
}) => {

  const { 
    formContext: { register }, 
    fieldName,
    ...fieldProps
  } = useEstField({
    fieldName: 'materialProfRate',
    rowIdx,
  });
  
  return (
    <OutlinedPercentInput
      {...fieldProps}
      {...register(
        fieldName,
        {
          onChange: () => handleChange(rowIdx),
        },
      )}
  
    />
  );
};