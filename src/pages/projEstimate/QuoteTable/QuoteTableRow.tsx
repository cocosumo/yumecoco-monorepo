

import { TableCell, TableRow } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { produce } from 'immer';
import { DisplayNumber } from '../fieldComponents/DisplayNumber';
import { FormikAutocomplete } from '../fieldComponents/FormikAutocomplete';
import { FormikInput } from '../fieldComponents/FormikInput';
import { FormikPulldown } from '../fieldComponents/FormikPulldown';
import {  getItemFieldName, taxChoices, TypeOfForm, unitChoices } from '../form';
import { useElementCalc } from '../hooks/useElementCalc';
import { useMaterialsOptions } from '../hooks/useMaterialOptions';
import { TMaterialOptions } from '../hooks/useMaterials';
import { QtRowAddDelete, QtRowMove } from './rowActions';



export const QuoteTableRow = (
  {
    rowIdx,
    arrayHelpers,
    materialOptions,
  }: {
    rowIdx: number,
    arrayHelpers: FieldArrayRenderProps,
    materialOptions: TMaterialOptions,
  }) => {
  const { setValues } = useFormikContext<TypeOfForm>();

  const result = useElementCalc(rowIdx);

  const {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
    handleMajorItemChange,
    handleMiddleItemChange,
    handleMaterialChange,
  } = useMaterialsOptions(rowIdx, materialOptions);

  const handleChangeCostPrice = (inputVal: string) => {
    setValues(
      (prev) => produce(prev, (draft) => {
        if ((+inputVal < 0) && (draft.items[rowIdx].costPrice >= 0)) {
          draft.items[rowIdx].costPrice = +inputVal;
          draft.items[rowIdx].quantity = 1;
          draft.items[rowIdx].elemProfRate = 0;
          draft.items[rowIdx].taxType = '非課税';
        } else {
          draft.items[rowIdx].costPrice = +inputVal;
        }
      }),
    );
  };

  return (
    <TableRow>

      <TableCell
        sx={{
          pl: 1, pr: 0,
        }}
      >
        <QtRowMove rowIdx={rowIdx} arrayHelpers={arrayHelpers} />
      </TableCell>
      <TableCell>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'majorItem')}
          handleChange={handleMajorItemChange}
          options={majorItemOpts}
        />
      </TableCell>

      <TableCell>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'middleItem')}
          handleChange={handleMiddleItemChange}
          options={middleItemOpts}
        />
      </TableCell>

      <TableCell>
        <FormikAutocomplete
          name={getItemFieldName(rowIdx, 'element')}
          handleChange={handleMaterialChange}
          options={materialOpts}
        />
      </TableCell>

      <TableCell>
        <FormikInput name={getItemFieldName(rowIdx, 'costPrice')} handleChange={handleChangeCostPrice} />
      </TableCell>

      <TableCell>
        <FormikInput name={getItemFieldName(rowIdx, 'quantity')} />
      </TableCell>

      <TableCell>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'unit')}
          options={unitChoices.map((c) => ({ label: c, value: c }))}
        />
      </TableCell>

      <TableCell>
        <FormikInput name={getItemFieldName(rowIdx, 'elemProfRate')} />
      </TableCell>

      <TableCell>
        <FormikPulldown
          name={getItemFieldName(rowIdx, 'taxType')}
          options={taxChoices.map((c) => ({ label: c, value: c }))}
        />
      </TableCell>

      <TableCell>
        <DisplayNumber value={result.unitPrice} suffix={'円'} />
      </TableCell>

      <TableCell>
        <DisplayNumber value={result.price} suffix={'円'} />
      </TableCell>

      <TableCell >
        <QtRowAddDelete
          rowIdx={rowIdx}
          arrayHelpers={arrayHelpers}
        />
      </TableCell>

    </TableRow>
  );
};