import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { getConstRecord } from '../../../api/kintone/construction';
import { getCustGroup } from '../../../api/kintone/custgroups/GET';
import { getProjTypeById } from '../../../api/kintone/projectType/GET';
import { useSnackBar } from '../../../hooks';
import { initialValues, TypeOfForm } from '../form';

export const useUpdateProjectId = () => {
  const { values, dirty, setValues } = useFormikContext<TypeOfForm>();
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
            constructionName, constructionType,
            constructionTypeId,
            custGroupId,
          }) => {

            const [
              custGroup,
              { profitRate },
            ] = await Promise.all([
              custGroupId?.value ? getCustGroup(custGroupId.value) : undefined,
              getProjTypeById(constructionTypeId.value),
            ]);



            const mainCustName = custGroup?.members?.value[0].value.customerName.value ?? '';

            // Throttle speed to avoid request spam.

            setValues((prev) => produce(prev, draft => {
              draft.custGroupId = custGroupId.value;
              draft.projName = constructionName.value;
              draft.projType = constructionType.value;
              draft.profitRate = +profitRate.value;
              draft.customerName = mainCustName;
            }));
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
          draft.projType = initialValues.projType;
          draft.profitRate = initialValues.profitRate;
          draft.customerName = initialValues.customerName;
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