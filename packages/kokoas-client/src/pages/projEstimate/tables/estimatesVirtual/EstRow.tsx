import { Autocomplete } from 'kokoas-client/src/components/reactHookForm/AutoComplete';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../form';
import { EstRowFormat } from './EstRowFormat';

import { useMaterialsOptions,
  UseSmartHandlers,
  useEstTRowHotKeys,
  UseManipulateItemRows,
} from '../../hooks';

import { 
  TaxType, 
  UnitPrice, 
  QuantityField, 
  ProfitRate, 
  CostPrice, 
  RowUnitPriceAfterTax, 
  MaterialDetails, 
  RowDetails, 
} from './rowFields';



export const EstRow = ({
  rowIdx,
  smartHandlers,
  isAtBottom,
  rowMethods,
}: {
  rowIdx: number,
  id: string,
  isAtBottom: boolean,
  isVisible: boolean,
  smartHandlers: UseSmartHandlers,
  rowMethods: UseManipulateItemRows,
}) => {
  const { control } = useFormContext<TypeOfForm>();
  const {
    handleChangeCostPrice,
    handleChangeQuantity,
    handleChangeProfitRate,
    handleChangeTaxType,
    handleChangeUnitPrice,
    handleChangeRowUnitPriceAfterTax,
  } = smartHandlers;

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
  } = useMaterialsOptions({ rowIdx, control });

  const rowSubRef = useEstTRowHotKeys({
    rowIdx,
    isLastRow: isAtBottom,
    ...rowMethods,
  });

  return (
    <EstRowFormat 
      ref={rowSubRef}
      majorItem={(
        <Autocomplete
          controllerProps={{
            name: getItemsFieldName(rowIdx, 'majorItem'),
            control,
          }}
          autoCompleteProps={{
            options : majorItemOpts,
            freeSolo: false,
          }}
        />
      )}
      middleItem={(
        <Autocomplete
          controllerProps={{
            name: getItemsFieldName(rowIdx, 'middleItem'),
            control,
          }}
          autoCompleteProps={{
            options : middleItemOpts,
            freeSolo: false,
          }}
        />
      )}
      material={(
        <Autocomplete
          controllerProps={{
            name: getItemsFieldName(rowIdx, 'material'),
            control,
          }}
          autoCompleteProps={{
            options : materialOpts,
            freeSolo: true,
          }}
        />
      )}
      materialDetails={(
        <MaterialDetails rowIdx={rowIdx} /> 
      )}
      costPrice={(
        <CostPrice rowIdx={rowIdx} handleChange={handleChangeCostPrice}  />
      )}
      quantity={(
        <QuantityField rowIdx={rowIdx} handleChange={handleChangeQuantity} />
      )}
      profitRate={(
        <ProfitRate rowIdx={rowIdx} handleChange={handleChangeProfitRate} />
      )}
      taxType={(
        <TaxType rowIdx={rowIdx} handleChange={handleChangeTaxType} />
      )}
      unitPrice={(
        <UnitPrice rowIdx={rowIdx} handleChange={handleChangeUnitPrice} />
      )}
      rowUnitPrice={(
        <RowUnitPriceAfterTax rowIdx={rowIdx} handleChange={handleChangeRowUnitPriceAfterTax} />
      )}
      rowDetails={(
        <RowDetails rowIdx={rowIdx} />
      )}
    />

  );
};