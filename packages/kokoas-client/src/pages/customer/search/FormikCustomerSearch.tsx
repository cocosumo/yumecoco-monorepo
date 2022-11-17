import { Formik } from 'formik';
import {  useState } from 'react';
import { useSnackBar } from '../../../hooks';
import { getSearchResult } from './api/getSearchResult';

import { initialValues, TypeOfForm } from './form';
import { ISearchData } from './hooks/useSearchResult';
import { SearchForm } from './SearchForm';

export const FormikCustomerSearch = () => {


  const [rows, setRows] = useState<ISearchData[]>([]);
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

    setRows(normalizedData || []);

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

      <SearchForm rows={rows} />

    </Formik>);
};