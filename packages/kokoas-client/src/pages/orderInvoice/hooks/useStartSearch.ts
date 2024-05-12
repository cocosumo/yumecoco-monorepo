
import { removeNullFalsyEmptyFromObject } from 'libs/src/removeNullFalsyEmpty';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { pages } from '../../Router';
import { useTypedFormContext } from './useTypedRHF';


/**
 * 他の検索画面と共通のものなで、
 * 時間あまったら、改修・リファクタリングください。
 * */ 
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
      navigate(`${pages.projOrderInvoiceSearch}?${queryStr}`);
    },
    (err) => {
      // 管理者用で残す
      console.error(err);
    },
  );

  return handleStartSearch;

};