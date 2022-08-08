import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { getSearchData, ISearchData } from './api/getSearchData';
import { initialValues } from './form';
import { SearchForm } from './SearchForm';

export const FormikCustomerSearch = () => {
  const [rows, setRows] = useState<ISearchData[]>([]);


  const handleSearch = async (values: typeof initialValues) => {
    const { storeId,
      custName, contactNum : phone,
      address, email,
      yumeAG, cocoAG, cocoConst,
      custType,  recordStatus,
    } = values;

    const { normalizedData } = await getSearchData({
      storeId, custName, phone,
      address, email, yumeAG, cocoAG, cocoConst,
      custType: custType !== '全て' ? custType : undefined,
      recordStatus,
    });

    setRows(normalizedData);
  };

  useEffect(()=>{
    handleSearch(initialValues);
  }, []);

  return (<Formik
  initialValues={initialValues}
  onSubmit={async (values, { setSubmitting }) => {

    await handleSearch(values);

    setSubmitting(false);
  }} >

    <SearchForm rows={rows} />


  </Formik>);
};