import { TableCell, TableRow } from '@mui/material';
import { Autocomplete } from 'kokoas-client/src/components/reactHookForm/AutoComplete';
import { TblCellStack } from 'kokoas-client/src/pages/projEstimate/fieldComponents/TblCellStack';
import { Control } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../../form';
import { useMaterialsOptions } from '../../hooks/useMaterialOptions';
import { headers } from './EstTHead';
import { EstRowMove } from './rowActions/EstRowMove';

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
  rowsLength,
}: {
  rowIdx: number,
  control: Control<TypeOfForm>
  isAtBottom: boolean,
  isVisible: boolean
  rowsLength: number,
}) => {
  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
  } = useMaterialsOptions({ rowIdx, control });



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
        <TblCellStack>
          <Autocomplete 
            controllerProps={{
              name: getItemsFieldName(rowIdx, 'material'),
              control,
            }}
            autoCompleteProps={{
              options : materialOpts,
              freeSolo: false,
            }}
          />
        </TblCellStack>

        
      </TableRow>
      <TableRow>
        
      </TableRow>
    </>
  );
};