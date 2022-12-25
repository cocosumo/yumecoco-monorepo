import { TableCell, TableRow } from '@mui/material';
import { PercentField, TextField } from 'kokoas-client/src/components/reactHookForm';
import { Autocomplete } from 'kokoas-client/src/components/reactHookForm/AutoComplete';
import { MoneyField } from 'kokoas-client/src/components/reactHookForm/MoneyField';
import { TblCellStack } from 'kokoas-client/src/pages/projEstimate/fieldComponents/TblCellStack';
import { Control, useWatch } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../../form';
import { useMaterialsOptions } from '../../hooks/useMaterialOptions';
import { headers } from './EstTHead';
import { EstRowMove } from './rowActions/EstRowMove';
import { QuantityField } from './rowFields/QuantityField';
import { TaxType } from './rowFields/TaxType';

type KRowFields = keyof TypeOfForm['items'][number];

const arrayFieldName: KeyOfForm = 'items';

export const getItemsFieldName = (
  rowIdx: number, fieldName: KRowFields,
) => `${arrayFieldName}.${rowIdx}.${fieldName}` as 'items.0.rowDetails';

export const EstTRow = ({
  rowIdx,
  control,
  isVisible,
  isAtBottom,
  isDisabled,
  rowsLength,
}: {
  rowIdx: number,
  control: Control<TypeOfForm>
  isAtBottom: boolean,
  isVisible: boolean,
  isDisabled: boolean,
  rowsLength: number,
}) => {

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
  } = useMaterialsOptions({ rowIdx, control });

  const costPrice = useWatch({
    name: getItemsFieldName(rowIdx, 'costPrice'),
    control,
  });

  return (
    <>
      <TableRow>
        <TableCell
          rowSpan={2}
          width={headers[0].width}
          sx={{
            pl: 1, pr: 0,
          }}
        >
          <EstRowMove 
            isAtBottom={isAtBottom}
            isVisible={isVisible}
            rowIdx={rowIdx}
            rowLength={rowsLength}
          />
        </TableCell>
        <TblCellStack
          rowSpan={2}
          width={headers[1].width}
        >
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
        </TblCellStack>
        <TblCellStack
          rowSpan={2}
          width={headers[2].width}
        >
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
          <TextField 
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'materialDetails'),
              control,
            }}
            textFieldProps={{
              size: 'small',
            }}
          />
        </TblCellStack>
        <TableCell
          width={headers[3].width}
          align='right'
        >
          {/* 原価 */}
          <MoneyField 
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'costPrice'),
              control,
            }}
            textFieldProps={{ size: 'small' }}
          />
        </TableCell>
        <TableCell
          width={headers[4].width}
          align='right'
        >
          {/* 数量 */}
          <QuantityField rowIdx={rowIdx} control={control} />
        </TableCell>
        <TableCell
          width={headers[5].width}
          align='right'
        >
          {/* 利益率 */}
          <PercentField 
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'elemProfRate'),
              control,
            }}
            textFieldProps={{ size: 'small' }}
          />
        </TableCell>

        <TableCell
          width={headers[6].width}
        >
          {/* 税 */}
          <TaxType 
            disabled={isDisabled} 
            control={control}
            rowIdx={rowIdx}
          />
        </TableCell>

        <TableCell
          width={headers[7].width}
        >
          {/* 単価 */}
          <MoneyField 
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'unitPrice'),
              control,
            }}
            textFieldProps={{ 
              size: 'small', 
              disabled: isDisabled || !costPrice,
            }}
          />
        </TableCell>
        <TableCell
          width={headers[8].width}
        >
          {/* 金額 */}
          <MoneyField 
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'rowUnitPriceAfterTax'),
              control,
            }}
            textFieldProps={{ 
              size: 'small', 
              disabled: isDisabled || !costPrice,
            }}
          />
        </TableCell>

        <TableCell width={headers[9].width}>
          
        </TableCell>
        
      </TableRow>
      <TableRow>
        <TableCell colSpan={2} />
        <TableCell colSpan={4}>
          <TextField 
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'rowDetails'),
              control,
            }}
            textFieldProps={{
              size: 'small',
            }}
          />
        </TableCell>
        <TableCell />
      </TableRow>
    </>
  );
};