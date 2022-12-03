

import { TableCell, TableRow } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { DisplayNumber } from '../fieldComponents/DisplayNumber';
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
  const { 
    values : {
      items,
    },
  } = useFormikContext<TypeOfForm>();
  const rowData = items[rowIdx];

  const {
    unitPrice,
    rowUnitPriceAfterTax,
  } = rowData;
  
  //const result = useElementCalc(rowIdx);

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
    <TableRow>

      <TableCell
        width={'3%'}
        sx={{
          pl: 1, pr: 0,
        }}
      >
        <QtRowMove rowIdx={rowIdx} arrayHelpers={arrayHelpers} />
      </TableCell>

      <TableCell width={'10%'}>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'majorItem')}
          handleChange={handleMajorItemChange}
          options={majorItemOpts}
          disabled={isDisabled}
        />
      </TableCell>

      <TableCell width={'10%'}>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'middleItem')}
          handleChange={handleMiddleItemChange}
          options={middleItemOpts}
          disabled={isDisabled}
        />
      </TableCell>

      <TableCell width={'12%'}>
        <FormikAutocomplete
          name={getItemFieldName(rowIdx, 'element')}
          handleChange={handleMaterialChange}
          options={materialOpts}
          disabled={isDisabled}
        />
      </TableCell>

      <TableCell width={'10%'} align='right'>
        <CostPriceField rowIdx={rowIdx} isDisabled={isDisabled} />
      </TableCell>

      <TableCell width={'8%'} align='right'>
        <QuantityField rowIdx={rowIdx} isDisabled={isDisabled} />
      </TableCell>

      <TableCell width={'8%'}>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'unit')}
          options={unitChoices.map((c) => ({ label: c, value: c }))}
          disabled={isDisabled}
        />
      </TableCell>

      <TableCell width={'6%'} align='right'>
        <ProfitRateField rowIdx={rowIdx} isDisabled={isDisabled} />
      </TableCell>

      <TableCell width={'8%'}>
        <TaxTypeField rowIdx={rowIdx} isDisabled={isDisabled} />
      </TableCell>

      <TableCell>
        <DisplayNumber value={unitPrice} suffix={'円'} />
      </TableCell>

      <TableCell>
        <DisplayNumber value={rowUnitPriceAfterTax} suffix={'円'} />
      </TableCell>

      <TableCell width={'3%'}>
        {!isDisabled &&
          <QtRowAddDelete
            rowIdx={rowIdx}
            arrayHelpers={arrayHelpers}
          />}
      </TableCell>

    </TableRow>
  );
};