import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { getConstRecord } from '../../../api/kintone/projects';
import { getCustGroup } from '../../../api/kintone/custgroups/GET';
import { getProjTypeById } from '../../../api/kintone/projectType/GET';
import { useSnackBar } from '../../../hooks';
import { initialValues, TypeOfForm } from '../form';

export const useUpdateProjectId = () => {
  const { values, dirty, setValues, setTouched } = useFormikContext<TypeOfForm>();
  const { setSnackState } = useSnackBar();
  const { projId } = values;
  const [isInitial, setIsInitial] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleStartLoading = () => setLoading(true);

  useEffect(
    ()=>{


      if (projId) {
        setIsInitial(false);
        setLoading(true);
        getConstRecord(projId)
          .then(async ({
            projName,
            projTypeName,
            projTypeId,
            custGroupId,
          }) => {

            const [
              custGroup,
              { profitRate },
            ] = await Promise.all([
              custGroupId?.value ? getCustGroup(custGroupId.value) : undefined,
              getProjTypeById(projTypeId.value),
            ]);

            const mainCustName = custGroup?.members?.value[0].value.customerName.value ?? '';

            setTouched({});
            setValues((prev) => {

              const { estimateId } = prev;

              return produce(prev, draft => {
                draft.projTypeProfit = !estimateId ? +profitRate.value : initialValues.projTypeProfit;
                draft.custGroupId = custGroupId.value;
                draft.projName = projName.value;
                draft.projTypeName = projTypeName.value;
                draft.projTypeId = projTypeId.value;
                draft.projTypeProfitLatest = +profitRate.value;
                draft.customerName = mainCustName;
              });
            });
            setLoading(false);

          })
          .catch((err) => {
            setSnackState({
              open: true,
              severity: 'error',
              message: `レコード取得が失敗しました。管理者にご連絡ください。useUpdateProjectId ${err.message}`,
            });
            setLoading(false);
          });

      } else if (!projId && dirty) {
        setLoading(false);
        setValues((prev) => produce(prev, draft => {
          draft.projId = initialValues.projId;
          draft.projName = initialValues.customerName;
          draft.projTypeName = initialValues.projTypeName;
          draft.projTypeProfit = initialValues.projTypeProfit;
          draft.customerName = initialValues.customerName;
          draft.createdDate = initialValues.createdDate;
          draft.estimateId = initialValues.estimateId;
        }));
      }



    },
    [projId],
  );

  return {
    isLoading: loading || isInitial,
    handleStartLoading,
    values,
  };
};