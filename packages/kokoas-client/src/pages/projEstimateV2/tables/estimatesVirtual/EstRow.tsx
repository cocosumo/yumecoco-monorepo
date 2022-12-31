import { Stack } from '@mui/material';
import { Autocomplete } from 'kokoas-client/src/components/reactHookForm/AutoComplete';
import { useFormContext } from 'react-hook-form';
import { getItemsFieldName, TypeOfForm } from '../../form';

import { UseManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { useMaterialsOptions } from '../../hooks/useMaterialOptions';
import { UseSmartHandlers } from '../../hooks/useSmartHandlers';
import { headers } from '../estimate/EstTHead';
import { EstRowMove } from '../estimate/rowActions/EstRowMove';

export const EstRow = ({
  rowIdx,
  //id,
  isVisible,
  isAtBottom,
  rowsCount,
  smartHandlers,
  ...rowMethods
}: UseManipulateItemRows & {
  rowIdx: number,
  id: string,
  isAtBottom: boolean,
  isVisible: boolean,
  smartHandlers: UseSmartHandlers
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

  /*   const rowMainRef = useEstTRowHotKeys({
    rowIdx,
    isLastRow: isAtBottom,
    ...rowMethods,
  });
  const rowSubRef = useEstTRowHotKeys({
    rowIdx,
    isLastRow: isAtBottom,
    ...rowMethods,
  });
 */
  return (
    <Stack direction={'row'}>
      <EstRowMove
        {...rowMethods}
        isAtBottom={isAtBottom}
        isVisible={isVisible}
        rowIdx={rowIdx}
        rowsCount={rowsCount}
        width={headers[0].width}
      />
      <Stack spacing={1} direction={'column'} width={headers[1].width}>
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

      </Stack>
        
    </Stack>
  );

};