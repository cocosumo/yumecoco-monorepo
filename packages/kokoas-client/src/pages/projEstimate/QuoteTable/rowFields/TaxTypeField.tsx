import { FormikSelect } from 'kokoas-client/src/components';
import { taxChoices, TaxType } from 'types';
import { KeyOfForm, TKMaterials } from '../../form';
import { useCalculateRow } from '../../hooks/useCalculateRow';

export const TaxTypeField = ({
  rowIdx, 
  itemsFieldName = 'items',
  isDisabled,
}: {
  itemsFieldName?: KeyOfForm,
  rowIdx: number
  isDisabled?: boolean,
}) => {
  
  const { handleChange } = useCalculateRow<TaxType, boolean>({
    watchField: 'isTaxable',
    rowIdx,
    transform : (v) => v === '課税', // 利益率変換
  });


  const fieldName: TKMaterials = 'taxType';
  
  const name = `${itemsFieldName}[${rowIdx}].${fieldName}`;

  return (
    <FormikSelect
      label=''
      name={name}
      variant="standard"
      size={'small'}
      options={taxChoices.map((c) => ({ label: c, value: c }))}
      disabled={isDisabled}
      onChange={handleChange}
    />
  );
};