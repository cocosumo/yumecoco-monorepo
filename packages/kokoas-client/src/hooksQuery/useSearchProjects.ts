
import { useCallback } from 'react';
import {  IProjects, KProjects } from 'types';
import { useProjects } from './useProjects';

/**
 * 見積番号で取得する
 */
export const useSearchProjects = (
  searchTerm: string,
) => {

  return useProjects({
    select: useCallback((data) => {
      const searchFields: KProjects[] = ['projName', 'address1', 'address2'];

      return data
        .filter((d) => searchFields
          .some((field) => {
            const val = d[field].value;
            return typeof val === 'string' && val.includes(searchTerm);
          }),
        );
    }, [searchTerm]),
  });
};
