import { Switch } from '@mui/material';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';
import { UseSmartHandlers } from '../../../hooks';

export const Taxable = ({
  rowIdx,
  handleChange,
}: {
  rowIdx: number,
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
    <Controller
      name={getItemsFieldName(rowIdx, 'taxable')}
      render={({ field }) =>  {
        const {
          onChange,
          value,
          ...others
        } = field;

        return (
          <Switch
            {...others}
            defaultChecked={value}
            onChange={(e) => {
              onChange(e);
              handleChange(rowIdx);
            }}
            color={'success'}
            size={'medium'}
            disabled={!!envStatus || !+(costPrice ?? 0)}
          />
        );
      }}
    />

  );
};