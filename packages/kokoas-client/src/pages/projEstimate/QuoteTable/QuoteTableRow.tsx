

import { TableCell, TableRow } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { produce } from 'immer';
import { FormikMoneyField } from 'kokoas-client/src/components/ui/textfield';
import { useEffect } from 'react';
import { DisplayNumber } from '../fieldComponents/DisplayNumber';
import { FormikAutocomplete } from '../fieldComponents/FormikAutocomplete';
import { FormikInput } from '../fieldComponents/FormikInput';
import { FormikPulldown } from '../fieldComponents/FormikPulldown';
import { getItemFieldName, initialValues, taxChoices, TypeOfForm, unitChoices } from '../form';
import { useElementCalc } from '../hooks/useElementCalc';
import { useMaterialsOptions } from '../hooks/useMaterialOptions';
import { QtRowAddDelete, QtRowMove } from './rowActions';
import { v4 as uuidv4 } from 'uuid';


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
  const { setValues,
    values : {
      items,
    },
  } = useFormikContext<TypeOfForm>();
  const rowCostPrice = items[rowIdx].costPrice;
  const isLastRow = rowIdx === items.length - 1;

  const result = useElementCalc(rowIdx);

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
    handleMajorItemChange,
    handleMiddleItemChange,
    handleMaterialChange,
  } = useMaterialsOptions(rowIdx);

  useEffect(() => {

    setValues(
      (prev) => produce(prev, (draft) => {

        if ((+rowCostPrice < 0)) {
          draft.items[rowIdx].quantity = 1;
          draft.items[rowIdx].elemProfRate = 0;
          draft.items[rowIdx].taxType = '非課税';
        } else if ( isLastRow && +rowCostPrice > 0) {
          draft.items.push({
            ...initialValues.items[0],
            key: uuidv4(),
            elemProfRate: draft.projTypeProfit,
          });
        }

        draft.items[rowIdx].costPrice = rowCostPrice;
      }),
    );
  }, [rowCostPrice, isLastRow, setValues, rowIdx]);

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
        <FormikInput name={getItemFieldName(rowIdx, 'quantity')} disabled={isDisabled} />
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
        <DisplayNumber value={result.unitPrice} suffix={'円'} />
      </TableCell>

      <TableCell>
        <DisplayNumber value={result.price} suffix={'円'} />
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