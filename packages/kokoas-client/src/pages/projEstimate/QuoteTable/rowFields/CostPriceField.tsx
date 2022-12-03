
import { FormikMoneyField } from 'kokoas-client/src/components';

import { KeyOfForm, TKMaterials } from '../../form';
import { useCalculateRow } from '../../hooks/useCalculateRow';

export const CostPriceField = ({
  rowIdx,
  itemsFieldName = 'items',
  isDisabled = false,
}: {
  rowIdx: number
  itemsFieldName?: KeyOfForm,
  isDisabled?: boolean,
}) => {

  const { handleChange } = useCalculateRow({
    watchField: 'costPrice',
    rowIdx,
  });

  const fieldName: TKMaterials = 'costPrice';
  const name = `${itemsFieldName}[${rowIdx}].${fieldName}`;

  return (
    <FormikMoneyField
      name={name}
      variant="standard"
      disabled={isDisabled}
      onChange={handleChange}
    />
  );
};