import { RenderEditCellProps } from 'react-data-grid';
import { RowItem } from '../useColumns';
import { useMaterialsItem } from 'kokoas-client/src/hooksQuery';
import { useCallback } from 'react';
import { CustomAutocomplete } from './CustomAutocomplete';


/** 部材 */
const Materials = (props: RenderEditCellProps<RowItem>) => {
  const { row } = props;
 
  const { data } = useMaterialsItem({
    select: useCallback((d) => {
      return d
        .filter(({ 大項目名: majorItem, 中項目名: middleItem }) => 
          (!row.majorItem || majorItem.value === row.majorItem) 
          && (!row.middleItem || middleItem.value === row.middleItem))
        .map(({ 部材名: materialName }) => materialName.value);
    },
    [row.majorItem, row.middleItem]),
  });

  return (<CustomAutocomplete {...props} data={data} />);
};

export const renderMaterials = (props: RenderEditCellProps<RowItem>) => {
  return (
    <Materials {...props} />
  );
};