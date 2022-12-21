import { useMaterialsItem } from './../../../hooksQuery/useMaterialsItem';
import { useFormikContext } from 'formik';
import { TypeOfForm, unitChoices } from '../form';
import { produce } from 'immer';
import { useCallback } from 'react';
import { useMaterialsMajor, useMaterialsMid } from 'kokoas-client/src/hooksQuery';



export const useMaterialsOptions = (
  rowIdx: number,
) => {


  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { items } = values;
  const { majorItem, middleItem } = items[rowIdx];

  /* 大項目 */
  const {
    data: majorItemOpts = [],
  } = useMaterialsMajor({
    select: useCallback((d) => {
      const options = d
        .map(({ 大項目名 }) => 大項目名.value);
      return [''].concat(options);
    }, []),
  });

  /* 中項目データと絞り込んだ選択肢 */
  const {
    data: {
      middleItemOpts = [],
      data: middleItems = undefined,
    } = {},
  } = useMaterialsMid({
    select: useCallback((d) => {
      const derived = d.reduce((accu, { 大項目名, 中項目名 }) => {
        if (!majorItem || 大項目名?.value === majorItem ) {
          // Ignore duplicates
          if (!accu.some((value) => value === 中項目名.value ))
            accu.push(中項目名.value);
        }

        return accu;
      }, [''] as string[]);

      return {
        middleItemOpts: derived,
        data: d,
      };
    }, [majorItem]),
  });

  /* 部材データと絞り込んだ選択肢 */
  const {
    data: {
      materialOpts = [],
      data: materials = undefined,
    } = {},
  } = useMaterialsItem({
    select: useCallback((d) => {
      const derived = d.reduce((accu, { 大項目名, 中項目名, 部材名 }) => {
        if (
          (majorItem && 大項目名?.value === majorItem)
          || (!majorItem && (!middleItem || 中項目名?.value === middleItem))
        ) {
          // Ignore duplicates
          if (!(accu.some((value) => value === 部材名.value )))
            accu.push(部材名.value);
        }
        return accu;
      }, [''] as string[]);

      return {
        materialOpts: derived,
        data: d,
      };
    }, [middleItem, majorItem]),
  });



  /* Change handlers */

  const handleMajorItemChange = useCallback(() => {
    setValues((prev) => produce(prev, (draft) => {
      draft.items[rowIdx].material = '';
      draft.items[rowIdx].middleItem = '';
    }));
  }, [setValues, rowIdx]);

  const handleMiddleItemChange = useCallback((newVal: string) => {

    if (newVal) {
      setValues((prev) => produce(prev, (draft) => {
        // Clear material when middleItem change
        if (prev.items[rowIdx].middleItem !== newVal) {
          draft.items[rowIdx].material = '';
        }

        const selectedMiddleItem = middleItems?.find(({ 中項目名 }) => 中項目名.value === newVal);
        draft.items[rowIdx].majorItem = selectedMiddleItem?.大項目名.value || '';
      }));
    }
  }, [middleItems, setValues, rowIdx]);

  const handleMaterialChange = useCallback((newVal: string) => {
    if (newVal) {
      const selectedMaterial = materials?.find(({ 部材名 }) => 部材名.value === newVal);
      if (selectedMaterial) {

        const newUnit = (selectedMaterial?.単位?.value ?? '') as typeof unitChoices[number];

        setValues(
          (prev) => produce(prev, (draft) => {
            draft.items[rowIdx].majorItem = selectedMaterial.大項目名.value;
            draft.items[rowIdx].middleItem = selectedMaterial.中項目名.value;
            draft.items[rowIdx].costPrice = +selectedMaterial.原価.value;
            draft.items[rowIdx].unit = newUnit;
          }),
        );
      }
    }
  }, [rowIdx, setValues, materials]);


  return {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
    handleMajorItemChange,
    handleMiddleItemChange,
    handleMaterialChange,
  };


};