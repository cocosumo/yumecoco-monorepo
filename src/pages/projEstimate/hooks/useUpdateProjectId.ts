import { useFormikContext } from 'formik';
import { produce } from 'immer';
import { useEffect, useState } from 'react';
import { getConstRecord } from '../../../api/kintone/construction';
import { getProjTypeByLabel } from '../../../api/kintone/projectType/GET';
import { TypeOfForm } from '../form';

export const useUpdateProjectId = () => {
  const { values, resetForm, dirty, setValues } = useFormikContext<TypeOfForm>();
  const { projId } = values;
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    if (projId) {
      setLoading(true);
      getConstRecord(projId)
        .then(async ({
          constructionName, constructionType,
        }) => {

          const { profitRate } = await getProjTypeByLabel(constructionType.value);

          setValues((prev) => produce(prev, draft => {
            draft.projName = constructionName.value;
            draft.constructionType = constructionType.value;
            draft.profitRate = +profitRate.value;
          }));

          setLoading(false);
        });

    } else if (!projId && dirty) {
      resetForm();
    }
  },  [projId]);

  return {
    isLoading: loading,
  };
};