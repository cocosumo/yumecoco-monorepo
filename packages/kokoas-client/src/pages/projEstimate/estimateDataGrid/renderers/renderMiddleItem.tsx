import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { useMaterialsMid } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { CustomAutocomplete } from './CustomAutocomplete';

/** 中項目 */
const MiddleItemSelect = (props: RenderEditCellProps<RowItem>) => {
  const { row } = props;

  const { data } = useMaterialsMid({
    select: useCallback(
      (d) => d
        .filter(({ 大項目名: majorItem }) => !row.majorItem || row.majorItem === majorItem.value )
        .map(({ 中項目名: midItem }) => midItem.value ), 
      [row.majorItem],
    ),
  });

  return (
    <CustomAutocomplete {...props} data={data} />
  );
};

export const renderMiddleItem = (props: RenderEditCellProps<RowItem>) => {
  return (
    <MiddleItemSelect {...props} />
  );
};