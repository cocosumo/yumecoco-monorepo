
import { FormikMoneyField } from 'kokoas-client/src/components';

import { KeyOfForm, TKMaterials } from '../../form';
import { useCalculateRow } from '../../hooks/useCalculateRow';

export const UnitPriceField = ({
  rowIdx,
  itemsFieldName = 'items',
  isDisabled = false,
}: {
  rowIdx: number
  itemsFieldName?: KeyOfForm,
  isDisabled?: boolean,
}) => {

  const { handleChange } = useCalculateRow({
    watchField: 'unitPrice',
    rowIdx,
  });

  const fieldName: TKMaterials = 'unitPrice';
  const name = `${itemsFieldName}[${rowIdx}].${fieldName}`;



  return (
    <FormikMoneyField
      name={name}
      size={'small'}
      disabled={isDisabled}
      onChange={handleChange}
      onFocus={({ target }) => target.select()}
    />
  );
};