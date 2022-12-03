
import { FormikNumberField } from 'kokoas-client/src/components';

import { KeyOfForm, TKMaterials } from '../../form';
import { useCalculateRow } from '../../hooks/useCalculateRow';

export const QuantityField = ({
  rowIdx,
  itemsFieldName = 'items',
  isDisabled = false,
}: {
  rowIdx: number
  itemsFieldName?: KeyOfForm,
  isDisabled?: boolean,
}) => {

  const { handleChange } = useCalculateRow({
    watchField: 'quantity',
    rowIdx,
  });

  const fieldName: TKMaterials = 'quantity';
  const name = `${itemsFieldName}[${rowIdx}].${fieldName}`;



  return (
    <FormikNumberField
      name={name}
      variant="standard"
      disabled={isDisabled}
      onChange={handleChange}
    />
  );
};