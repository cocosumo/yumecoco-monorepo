import { MenuItem } from '@mui/material';
import { Select } from 'kokoas-client/src/components/reactHookForm';
import { useFormContext, useWatch } from 'react-hook-form';
import { taxChoices } from 'types';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks/useSmartHandlers';


export const TaxType = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number
  handleChange: UseSmartHandlers['handleChangeTaxType']
}) => {

  const { control } = useFormContext<TypeOfForm>();

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
    <Select
      controllerProps={{
        name: getItemsFieldName(rowIdx, 'taxable'),
        control,
      }}
      selectProps={{
        size: 'small',
        disabled: !!envStatus || !+(costPrice ?? 0),
        onChange: () => handleChange(rowIdx),
      }}
    >
      {taxChoices.map((choice) => (
        <MenuItem
          key={choice}
          value={(choice === '課税') as any}
        >
          {choice}
        </MenuItem>
      ))}
    </Select>
  );
};