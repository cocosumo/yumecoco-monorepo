import { OutlinedPercentInput } from 'kokoas-client/src/components/reactHookForm/OutlinedPercentInput';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';

export const ProfitRate = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeProfitRate']
}) => {
  const { register } = useFormContext<TypeOfForm>();

  return (
    <OutlinedPercentInput
      {...register(
        getItemsFieldName(rowIdx, 'materialProfRate'),
        {
          onChange: () => handleChange(rowIdx),
        },
      )}
      onFocus={({ target }) => target.select()}
    />
  );
};