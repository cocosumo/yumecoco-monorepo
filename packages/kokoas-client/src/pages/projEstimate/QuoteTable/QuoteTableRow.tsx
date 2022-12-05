

import { TableCell, TableRow } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { FormikAutocomplete } from '../fieldComponents/FormikAutocomplete';
import { FormikPulldown } from '../fieldComponents/FormikPulldown';
import { getItemFieldName, TypeOfForm, unitChoices } from '../form';
import { useMaterialsOptions } from '../hooks/useMaterialOptions';
import { QtRowAddDelete, QtRowMove } from './rowActions';
import { useAdjustOnRowDiscount } from '../hooks/useAdjustOnRowDiscount';
import { CostPriceField } from './rowFields/CostPriceField';
import { QuantityField } from './rowFields/QuantityField';
import { ProfitRateField } from './rowFields/ProfitRateField';
import { TaxTypeField } from './rowFields/TaxTypeField';
import { UnitPriceField } from './rowFields/UnitPriceField';
import { RowUnitPriceAfterTax } from './rowFields/RowUnitPriceAfterTax';
import { FormikTextFieldV2 } from 'kokoas-client/src/components';


export const QuoteTableRow = (
  {
    rowIdx,
    arrayHelpers,
    envStatus,
  }: {
    rowIdx: number,
    arrayHelpers: FieldArrayRenderProps,
    envStatus: string,
  }) => {

  const { values: { items } } = useFormikContext<TypeOfForm>();
  const { costPrice } = items[rowIdx];

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
    handleMajorItemChange,
    handleMiddleItemChange,
    handleMaterialChange,
  } = useMaterialsOptions(rowIdx);

  useAdjustOnRowDiscount(rowIdx);
  const isDisabled = !!envStatus;

  return (
    <>
      <TableRow>

        <TableCell
          rowSpan={2}
          width={'3%'}
          sx={{
            pl: 1, pr: 0,
          }}
        >
          <QtRowMove rowIdx={rowIdx} arrayHelpers={arrayHelpers} />
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

        <TableCell width={'10%'} align='right'>
          {/* 原価 */}
          <CostPriceField rowIdx={rowIdx} isDisabled={isDisabled} />
        </TableCell>

        <TableCell width={'8%'} align='right'>
          {/* 数量 */}
          <QuantityField rowIdx={rowIdx} isDisabled={isDisabled} />
        </TableCell>

        <TableCell width={'8%'}>
          {/* 単位 */}
          <FormikPulldown
            name={getItemFieldName(rowIdx, 'unit')}
            options={unitChoices.map((c) => ({ label: c, value: c }))}
            disabled={isDisabled}
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

        <TableCell width={'12%'}>
          {/* 単価 */}
          <UnitPriceField rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell width={'10%'}>
          {/* 金額 */}
          <RowUnitPriceAfterTax rowIdx={rowIdx} isDisabled={isDisabled || !costPrice} />
        </TableCell>

        <TableCell width={'3%'}>
          {!isDisabled &&
          <QtRowAddDelete
            rowIdx={rowIdx}
            arrayHelpers={arrayHelpers}
          />}
        </TableCell>

      </TableRow>
      <TableRow >
        <TableCell colSpan={2} />
        <TableCell colSpan={2}>
          <FormikTextFieldV2
            label={'品番・色など'}
            name={getItemFieldName(rowIdx, 'materialDetails')}
            size={'small'}
            multiline
            placeholder='赤'
          />
        </TableCell>
        <TableCell />
        <TableCell colSpan={5}>
          <FormikTextFieldV2
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