

import { TableCell, TableRow } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { FormikMoneyField, FormikNumberField } from 'kokoas-client/src/components/ui/textfield';
import { DisplayNumber } from '../fieldComponents/DisplayNumber';
import { FormikAutocomplete } from '../fieldComponents/FormikAutocomplete';
import { FormikInput } from '../fieldComponents/FormikInput';
import { FormikPulldown } from '../fieldComponents/FormikPulldown';
import { getItemFieldName, TypeOfForm, unitChoices } from '../form';
import { useMaterialsOptions } from '../hooks/useMaterialOptions';
import { QtRowAddDelete, QtRowMove } from './rowActions';
import { taxChoices } from 'types';
import { useAdjustOnRowDiscount } from '../hooks/useAdjustOnRowDiscount';


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
        <FormikMoneyField
          name={getItemFieldName(rowIdx, 'costPrice')}
          variant="standard"
          disabled={isDisabled}
        />
      </TableCell>

      <TableCell width={'8%'} align='right'>
        <FormikNumberField 
          name={getItemFieldName(rowIdx, 'quantity')} 
          variant="standard"
          disabled={isDisabled}
        />
      </TableCell>

      <TableCell width={'8%'}>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'unit')}
          options={unitChoices.map((c) => ({ label: c, value: c }))}
          disabled={isDisabled}
        />
      </TableCell>

      <TableCell width={'6%'} align='right'>
        <FormikInput name={getItemFieldName(rowIdx, 'elemProfRate')} disabled={isDisabled} />
      </TableCell>

      <TableCell width={'8%'}>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'taxType')}
          options={taxChoices.map((c) => ({ label: c, value: c }))}
          disabled={isDisabled}
        />
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