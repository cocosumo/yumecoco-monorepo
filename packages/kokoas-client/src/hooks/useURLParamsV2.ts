import { useLocation } from 'react-router-dom';
import { URLParams } from '../helpers/url';
import { useMemo } from 'react';
import qs from 'qs';
import { parseBoolean } from 'libs';

/**
  * This is the new version of useURLParams.
  * It uses qs instead of native URLSearchParams.
  * The reason is that URLSearchParams arrays inconsistently.
  * 
  **/
export const useURLParamsV2 = <T = URLParams>() => {
  const {
    search,
  } = useLocation();

  const queryParams = useMemo(() => {
    const rawParams = qs.parse(search.replace(/^\?/, ''));
    return parseBoolean(rawParams);
  }, [search]);
  return queryParams as T;
};