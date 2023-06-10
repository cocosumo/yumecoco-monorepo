import { useFormContext } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { removeNullFalsyEmptyFromObject } from 'libs/src/removeNullFalsyEmpty';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';

export const useStartSearch = () => {
  const {
    handleSubmit,
  } = useFormContext<TypeOfForm>();

  const navigate = useNavigate();

  const handleStartSearch = handleSubmit((data) => {
    const queryStr =  qs.stringify(
      removeNullFalsyEmptyFromObject(data), 
      { arrayFormat: 'comma', encode: false },
    );
    navigate(`${pages.projSearch}?${queryStr}`);
  });

  return handleStartSearch;

};