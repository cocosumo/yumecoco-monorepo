import { useProjTypes } from 'kokoas-client/src/hooksQuery';
import { useTypedFormContext, useTypedWatch } from './useTypedRHF';
import { useEffect } from 'react';
import { TForm } from '../schema';

/**
 * 「工事種別」と「ゆめてつAG」に変更があったら、
 * 「紹介料」を再設定する。
 * 
 * 紹介料率は、工事種別のDBから取得しますが、以下の優先順位で取得する。
 * - 個別設定に該当すれば、それを優先
 * - 役職別設定があれば、それを優先
 * - 工事種別のデフォルト設定
 */
export const useChangeCommRate = () => {
  const { data } = useProjTypes();

  const {
    setValue,
    control,
  } = useTypedFormContext();

  const [
    selectedProjTypeId,
    selectedYumeAG,
  ] = useTypedWatch({
    control,
    name: [
      'projTypeId',
      'yumeAG',
    ],
  }) as [TForm['projTypeId'], TForm['yumeAG']];



  useEffect(() => {


    const {
      commRateByEmpList,
      commRateByRoleList,
      yumeCommFeeRate,
    } = data?.find(({ uuid }) => uuid.value === selectedProjTypeId) || {};

    const matchedEmp = commRateByEmpList?.value
      .find(({ value: { empId: ptEmpId } }) => selectedYumeAG.some(({ empId }) => empId === ptEmpId.value));

    const matchedRole = commRateByRoleList?.value
      .find(({ value: { role: ptRole } }) => selectedYumeAG.some(({ empRole }) => empRole === ptRole.value));

    let newCommRate = 0;

    if (matchedEmp) {
      newCommRate = Number(matchedEmp.value.commRateByEmp.value);
    } else if (matchedRole) {
      newCommRate = Number(matchedRole.value.commRateByRole.value);
    } else {
      newCommRate = Number(yumeCommFeeRate?.value);
    }

    setValue('commissionRate', newCommRate, {
      shouldValidate: true,
      shouldDirty: true,
    });

  }, [
    setValue,
    selectedProjTypeId,
    selectedYumeAG,
    data,
  ]);

};