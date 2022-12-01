import { getKanaRow } from 'kokoas-client/src/helpers/utils';
import { useAddressTowns } from 'kokoas-client/src/hooksQuery';
import { replaceKanaHalfToHira } from 'kokoas-client/src/lib';
import { useCallback } from 'react';
import { locationSorter } from '../common/sorter';

export const useGroupedTowns = (params: Parameters<typeof useAddressTowns>[0]) => {
  return useAddressTowns(
    params,
    { select: useCallback((d) => {
      const grouped = d.reduce((
        acc,
        {
          $id: id,
          town,
          townReading,
          postalCode,
        },
      ) => {
        const isOthers =  town.value === '以下に掲載がない場合';
        const resolvedTown =  isOthers ? 'その他' : town.value;

        const hiraTownReading = isOthers ? 'そのた' : replaceKanaHalfToHira(townReading.value);

        const firstChar = isOthers ? '他' : getKanaRow(hiraTownReading.charAt(0));

        if (firstChar === '他') {
          console.log(isOthers, town.value, townReading.value, hiraTownReading,  getKanaRow(hiraTownReading.charAt(0)));
        }

        acc[firstChar] = acc[firstChar] ?? [];
        acc[firstChar].push({
          id: id.value,
          town: resolvedTown,
          townReading: isOthers ? 'お探しの町域が見つからない場合にお書きいただく番号であり、町域を特定するものではありませんのでご注意ください' : hiraTownReading,
          postalCode: postalCode.value,
        });

        return acc;

      }, {} as {
        [char: string] : {
          id: string,
          town: string,
          postalCode: string,
          townReading: string
        }[]
      });

      return Object.entries(grouped)
        .sort(locationSorter);

    }, []) },
  );
};