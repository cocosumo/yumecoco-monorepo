import { MoneyField } from 'kokoas-client/src/components/reactHookForm/MoneyField';
import { useFormContext, useWatch } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../../form';

export const UnitPrice = ({
  rowIdx,
}: {
  rowIdx: number
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
    <MoneyField
      controllerProps={{
        name: getItemsFieldName(rowIdx, 'unitPrice'),
        control,
      }}
      textFieldProps={{
        size: 'small',
        disabled: !!envStatus || !(+costPrice),
      }}
    />
  );
};