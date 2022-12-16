

import { IconButton, SxProps, TableCell, TableRow } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { FormikAutocomplete } from '../fieldComponents/FormikAutocomplete';
import { FormikPulldown } from '../fieldComponents/FormikPulldown';
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
  //useAdjustOnRowDiscount(rowIdx);

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

        <TableCell width={'8%'}>
          <FormikPulldown
            name={getItemFieldName(rowIdx, 'majorItem')}
            handleChange={handleMajorItemChange}
            options={majorItemOpts}
            disabled={isDisabled}
          />
        </TableCell>

        <TableCell width={'8%'}>
          <FormikPulldown
            name={getItemFieldName(rowIdx, 'middleItem')}
            handleChange={handleMiddleItemChange}
            options={middleItemOpts}
            disabled={isDisabled}
          />
        </TableCell>

        <TableCell width={'8%'}>
          <FormikAutocomplete
            name={getItemFieldName(rowIdx, 'material')}
            handleChange={handleMaterialChange}
            options={materialOpts}
            disabled={isDisabled}
          />
        </TableCell>

        <TableCell width={'8%'} align='right'>
          {/* 原価 */}
          <CostPriceField rowIdx={rowIdx} isDisabled={isDisabled} />
        </TableCell>

        <TableCell width={'8%'} align='right'>
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

        <TableCell width={'6%'} align='right'>
          {/* 利益率 */}
          <ProfitRateField rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell width={'8%'}>
          {/* 税 */}
          <TaxTypeField rowIdx={rowIdx} isDisabled={isDisabled} />
        </TableCell>

        <TableCell width={'15%'}>
          {/* 単価 */}
          <UnitPriceField rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell width={'15%'}>
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
        <TableCell colSpan={2}>
          <FormikTextFieldV2
            disabled={isDisabled}
            label={'品番・色など'}
            name={getItemFieldName(rowIdx, 'materialDetails')}
            size={'small'}
            multiline
            placeholder='赤'
          />
        </TableCell>
        <TableCell />
        <TableCell colSpan={4}>
          <FormikTextFieldV2
            disabled={isDisabled}
            label={'備考'}
            name={getItemFieldName(rowIdx, 'rowDetails')}
            size={'small'}
            multiline
            placeholder='定価出し'
          />
        </TableCell>
        <TableCell />
      </TableRow>
    </>
  );
};