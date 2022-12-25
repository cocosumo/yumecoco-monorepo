import { useMaterialsItem } from './../../../hooksQuery/useMaterialsItem';
import { useCallback } from 'react';
import { useMaterialsMajor, useMaterialsMid } from 'kokoas-client/src/hooksQuery';
import { Control, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../form';
import { getItemsFieldName } from '../tables/estimate/EstTRow';



export const useMaterialsOptions = ({
  rowIdx,
  control,
}: {
  rowIdx : number,
  control: Control<TypeOfForm>
}) => {

  const [
    majorItem,
    middleItem,
  ] = useWatch({
    name: [getItemsFieldName(rowIdx, 'majorItem'), getItemsFieldName(rowIdx, 'middleItem')],
    control,
  });

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


  return {
    majorItemOpts,
    middleItemOpts,
    materialOpts,
  };


};