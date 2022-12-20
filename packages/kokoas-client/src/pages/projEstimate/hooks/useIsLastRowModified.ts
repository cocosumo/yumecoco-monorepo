import { useFormikContext } from 'formik';
import { useMemo } from 'react';
import { TypeOfForm } from '../form';

export const useIsLastRowModified = (
  initialRow: TypeOfForm['items'][number],
  rowIdx: number,
) => {

  const {
    values,
  } = useFormikContext<TypeOfForm>();

  const { items } = values;

  const isLastRow = rowIdx === items.length - 1;

  const currRow = items[rowIdx];

  const isLastRowModified = useMemo(() => {

    // 最終行じゃない場合、比較処理が必要ないので止める。
    if (!isLastRow) return false;

    //  頭に 「_」 あるものは、比較に無視。
    const { key: _k1, elemProfRate: _ep1, ...clonedInitialRow } = initialRow;
    const { key: _k2, elemProfRate: _ep2, ...clonedRow } = currRow;

    // 短いですが、速度が必要になったら、改善
    return JSON.stringify(clonedInitialRow) !== JSON.stringify(clonedRow);
  }, [initialRow, isLastRow, currRow]);


  return {
    isLastRowModified,
    isLastRow,
  };
};