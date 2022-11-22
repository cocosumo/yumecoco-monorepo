import { Formik } from 'formik';
import { useSnackBar } from '../../../hooks';
import { getSearchResult } from './api/getSearchResult';

import { initialValues, TypeOfForm } from './form';
import { FormCustSearch } from './FormCustSearch';

export const FormikCustomerSearch = () => {


  //const [rows, setRows] = useState<ISearchData[]>([]);
  const { setSnackState } = useSnackBar();


  const handleSearch = async (values: TypeOfForm) => {
    const { storeId,
      custName, contactNum : phone,
      address, email,
      yumeAG, cocoAG, cocoConst,
      custType,  recordStatus,
    } = values;

    const { normalizedData } = await getSearchResult({
      storeId, custName, phone,
      address, email, yumeAG, cocoAG, cocoConst,
      custType: custType !== '全て' ? custType : undefined,
      recordStatus,
    });

    return normalizedData;
  };


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values) => {
        const { length } = await handleSearch(values);
        setSnackState({
          severity: 'success',
          message: `${length ?? 0}件 見つかりました。`,
          open: true,
        });

      }}
    >

      <FormCustSearch />

    </Formik>);
};