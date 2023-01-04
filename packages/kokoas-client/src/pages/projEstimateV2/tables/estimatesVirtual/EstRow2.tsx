import { StackProps } from '@mui/material';
import { TextField } from 'kokoas-client/src/components/reactHookForm';
import { Autocomplete } from 'kokoas-client/src/components/reactHookForm/AutoComplete';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../form';
import { useMaterialsOptions } from '../../hooks/useMaterialOptions';
import { UseSmartHandlers } from '../../hooks/useSmartHandlers';
import { CostPrice } from '../estimate/rowFields/CostPrice';
import { ProfitRate } from '../estimate/rowFields/ProfitRate';
import { QuantityField } from '../estimate/rowFields/QuantityField';
import { RowUnitPriceAfterTax } from '../estimate/rowFields/RowUnitPriceAfterTax';
import { TaxType } from '../estimate/rowFields/TaxType';
import { UnitPrice } from '../estimate/rowFields/UnitPrice';
import { EstRowFormat } from './EstRowFormat';

export const EstRow2 = ({
  rowIdx,
  smartHandlers,
  stackProps,
}: {
  rowIdx: number,
  id: string,
  isAtBottom: boolean,
  isVisible: boolean,
  smartHandlers: UseSmartHandlers,
  stackProps?: StackProps
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


  return (
    <EstRowFormat 
      stackProps={stackProps}
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
        <TextField
          controllerProps={{
            name: getItemsFieldName(rowIdx, 'materialDetails'),
            control,
          }}
          textFieldProps={{
            size: 'small',
            multiline: true,
            rows: 1,
          }}
        />
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
    />

  );
};