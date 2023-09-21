
import { removeNullFalsyEmptyFromObject } from 'libs/src/removeNullFalsyEmpty';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { useTypedFormContext } from './useTypedHooks';

export const useStartSearch = () => {
  const {
    handleSubmit,
  } = useTypedFormContext();

  const navigate = useNavigate();

  const handleStartSearch = handleSubmit(
    (data) => {
      const queryStr =  qs.stringify(
        removeNullFalsyEmptyFromObject(data), 
        { arrayFormat: 'comma', encode: false },
      );

      
      navigate(`${pages.projProspectSearch}?${queryStr}`);
    },
    (err) => {
      // 管理者用で残す
      console.error(err);
    },
  );

  return handleStartSearch;

};