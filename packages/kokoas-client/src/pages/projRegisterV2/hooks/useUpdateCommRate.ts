import { useProjTypes } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext } from './useTypedRHF';
import { useCallback } from 'react';
import { TForm } from '../schema';
import { produce } from 'immer';

/**
 * 「工事種別」と「ゆめてつAG」に変更があったら、
 * 「紹介料」を再設定する。
 * 
 * 紹介料率は、工事種別のDBから取得しますが、以下の優先順位で取得する。
 * - 個別設定に該当すれば、それを優先
 * - 役職別設定があれば、それを優先
 * - 工事種別のデフォルト設定
 */
export const useUpdateCommRate = () => {
  const { data: projTypeRecs } = useProjTypes();

  const {
    setValue,
    getValues,
  } = useTypedFormContext();



  const handleUpdateCommRate = useCallback(({
    newYumeAG,
    newProjTypeId,
  }:{
    newProjTypeId?: TForm['projTypeId'],
    newYumeAG?: {
      index: number;
      value: TForm['yumeAG'][number]
    },
  }) => {
    
    // Deep copy, as we don't want to mutate the original value
    let selectedYumeAG: TForm['yumeAG'] = JSON.parse(JSON.stringify(getValues('yumeAG')));

    if (newYumeAG) {
      selectedYumeAG = produce(selectedYumeAG, draft => {
        draft[newYumeAG.index] = newYumeAG.value;
      });
    }

    const selectedProjTypeId = newProjTypeId || getValues('projTypeId');

    if (selectedYumeAG.some(({ empName }) => empName === 'ここすも')
    || selectedYumeAG.every(({ empId }) => !empId)) {
    // ここすも又は空の場合は、紹介料率を0にする
      setValue('commissionRate', 0, {
        shouldValidate: true,
        shouldDirty: true,
      });
      return;
    }


    const {
      commRateByEmpList,
      commRateByRoleList,
      yumeCommFeeRate,
    } = projTypeRecs?.find(({ uuid }) => uuid.value === selectedProjTypeId) || {};


    const matchedEmp = commRateByEmpList?.value
      .find(({ value: { empId: ptEmpId } }) => selectedYumeAG.some(({ empId }) => !!empId && empId === ptEmpId.value));

    const matchedRole = commRateByRoleList?.value
      .find(({ value: { role: ptRole } }) => selectedYumeAG.some(({ empRole }) => !!empRole && empRole === ptRole.value));

    let newCommRate = 0;

    if (matchedEmp) {
      newCommRate = Number(matchedEmp.value.commRateByEmp.value);
    } else if (matchedRole) {
      newCommRate = Number(matchedRole.value.commRateByRole.value);
    } else {
      newCommRate = Number(yumeCommFeeRate?.value || 0);
    }


    setValue('commissionRate', 
      newCommRate, {
        shouldValidate: true,
        shouldDirty: true,
      });


  }, [
    getValues,
    setValue,
    projTypeRecs,
  ]);

  return {
    handleUpdateCommRate,
  };

};