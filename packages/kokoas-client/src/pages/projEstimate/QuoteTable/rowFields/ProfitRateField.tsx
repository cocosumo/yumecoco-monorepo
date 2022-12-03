
import { FormikNumberField } from 'kokoas-client/src/components';

import { KeyOfForm, TKMaterials } from '../../form';
import { useCalculateRow } from '../../hooks/useCalculateRow';

export const ProfitRateField = ({
  rowIdx,
  itemsFieldName = 'items',
  isDisabled = false,
}: {
  rowIdx: number
  itemsFieldName?: KeyOfForm,
  isDisabled?: boolean,
}) => {

  const { handleChange } = useCalculateRow({
    watchField: 'profitRate',
    rowIdx,
    transform : (v) => v / 100, // 利益率変換
  });

  const fieldName: TKMaterials = 'elemProfRate';
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