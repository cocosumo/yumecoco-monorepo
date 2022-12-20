

import { IconButton, SxProps, TableCell, TableRow } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { FormikAutocomplete } from '../fieldComponents/FormikAutocomplete';
import { getItemFieldName, TypeOfForm } from '../form';
import { useMaterialsOptions } from '../hooks/useMaterialOptions';
import { QtRowAddDelete, QtRowMove } from './rowActions';
import { CostPriceField } from './rowFields/CostPriceField';
import { QuantityField } from './rowFields/QuantityField';
import { ProfitRateField } from './rowFields/ProfitRateField';
import { TaxTypeField } from './rowFields/TaxTypeField';
import { UnitPriceField } from './rowFields/UnitPriceField';
import { RowUnitPriceAfterTax } from './rowFields/RowUnitPriceAfterTax';
import { FormikTextFieldV2 } from 'kokoas-client/src/components';
import { MouseEvent, useMemo } from 'react';
import { isEven } from 'libs';
import { grey } from '@mui/material/colors';
import { useAdvancedTableRow } from '../hooks/useAdvancedTableRow';
import { TblCellStack } from '../fieldComponents/TblCellStack';

export const QuoteTableRow = (
  {
    rowIdx,
    arrayHelpers,
    envStatus,
    handleOpenUnitMenu,
  }: {
    rowIdx: number,
    arrayHelpers: FieldArrayRenderProps,
    envStatus: string,
    handleOpenUnitMenu: (e: MouseEvent<HTMLButtonElement>) => void
  }) => {

  const { values: { items } } = useFormikContext<TypeOfForm>();
  const { costPrice, unit } = items[rowIdx];

  const { focused, handleFocus } = useAdvancedTableRow(rowIdx);

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
    handleMajorItemChange,
    handleMiddleItemChange,
    handleMaterialChange,
  } = useMaterialsOptions(rowIdx);



  const isLastRow = rowIdx === items.length - 1;
  const isDisabled = !!envStatus;
  const isAlternateRow = isEven(rowIdx);

  const rowSx: SxProps = useMemo(() => ({
    background:  isAlternateRow ? grey[100] : 'white',
    opacity: isLastRow && !focused ? 0.5 : 1,
  }), [isAlternateRow, isLastRow, focused]);

  return (
    <>
      <TableRow
        onFocus={handleFocus}
        onBlur={handleFocus}
        sx={rowSx}
      >

        <TableCell
          rowSpan={2}
          width={'3%'}
          sx={{
            pl: 1, pr: 0,
          }}
        >
          {!isDisabled && !isLastRow && (
            <QtRowMove rowIdx={rowIdx} arrayHelpers={arrayHelpers} />
          )}
        </TableCell>

        <TblCellStack rowSpan={2} width={'24%'}>
          <FormikAutocomplete
            tabIndex={1}
            name={getItemFieldName(rowIdx, 'majorItem')}
            handleChange={handleMajorItemChange}
            freeSolo={false}
            options={majorItemOpts}
            disabled={isDisabled}
          />
          <FormikAutocomplete
            name={getItemFieldName(rowIdx, 'middleItem')}
            handleChange={handleMiddleItemChange}
            freeSolo={false}
            options={middleItemOpts}
            disabled={isDisabled}
          />
        </TblCellStack>

        <TblCellStack rowSpan={2} width={'12%'}>
          <FormikAutocomplete
            name={getItemFieldName(rowIdx, 'material')}
            handleChange={handleMaterialChange}
            options={materialOpts}
            disabled={isDisabled}
          />
          <FormikTextFieldV2
            disabled={isDisabled}
            name={getItemFieldName(rowIdx, 'materialDetails')}
            size={'small'}
            multiline
            placeholder='品番・色'
          />
        </TblCellStack>

        <TableCell
          width={'10%'}
          align='right'
        >
          {/* 原価 */}
          <CostPriceField rowIdx={rowIdx} isDisabled={isDisabled} />
        </TableCell>

        <TableCell
          width={'10%'}
          align='right'
        >
          {/* 数量 */}
          <QuantityField
            rowIdx={rowIdx}
            isDisabled={isDisabled}
            unitMenuButton={(
              <IconButton
                size='small'
                name={getItemFieldName(rowIdx, 'unit')}
                onClick={handleOpenUnitMenu}
                sx={{ fontSize: '12px' }}
              >
                {unit}
              </IconButton>
            )}
          />
        </TableCell>

        <TableCell
          width={'8%'}
          align='right'
        >
          {/* 利益率 */}
          <ProfitRateField rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell
          width={'4%'}
        >
          {/* 税 */}
          <TaxTypeField rowIdx={rowIdx} isDisabled={isDisabled} />
        </TableCell>

        <TableCell
          width={'12%'}
        >
          {/* 単価 */}
          <UnitPriceField rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell
          width={'12%'}
        >
          {/* 金額 */}
          <RowUnitPriceAfterTax rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell width={'3%'}>
          {!isDisabled && !isLastRow &&
          <QtRowAddDelete
            rowIdx={rowIdx}
            arrayHelpers={arrayHelpers}
          />}
        </TableCell>

      </TableRow>
      <TableRow
        onFocus={handleFocus}
        onBlur={handleFocus}
        sx={rowSx}
      >
        <TableCell colSpan={2} />
        <TableCell colSpan={4}>
          <FormikTextFieldV2
            disabled={isDisabled}
            name={getItemFieldName(rowIdx, 'rowDetails')}
            size={'small'}
            multiline
            placeholder='備考'
          />
        </TableCell>
        <TableCell />
      </TableRow>
    </>
  );
};