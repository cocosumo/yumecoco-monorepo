import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { useMaterialsMajor } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { CustomAutomplete } from './CustomAutomplete';


/** 大項目 */
const MajorItemSelect = (props: RenderEditCellProps<RowItem>) => {

  const { data } = useMaterialsMajor({
    select: useCallback(
      (d) => d
        .map(({ 大項目名: majorItemName }) => majorItemName.value ),
      [],
    ),
  });

  return (
    <CustomAutomplete {...props} data={data} />
  );
};

export const renderMajorItem = (props: RenderEditCellProps<RowItem>) => {
  return (
    <MajorItemSelect {...props} />
  );
};