import { red } from '@mui/material/colors';
import { ParsedDaikokuGenka } from 'types';
import { ItemCell } from './ItemCell';
import { ItemRowFormat } from './ItemRowFormat';

export const ItemRow = ({
  item,
}:{
  item: ParsedDaikokuGenka['items'][number]
})  => {
  const {
    majorItem,
    middleItem,
    material,
    costPrice,
    quantity,
    unitPrice,
    rowUnitPrice,
    rowCostPrice,
    unit,
    rowDetails,
  } = item;
  return (
    <ItemRowFormat
      majorItem={(
        <ItemCell>
          {majorItem}
        </ItemCell>
      )}
      middleItem={(
        <ItemCell>
          {middleItem}
        </ItemCell>
      )}
      material={(
        <ItemCell>
          {material}
        </ItemCell>
      )}
      costPrice={(
        <ItemCell textAlign={'right'}>
          {`${costPrice.toLocaleString()} 円`}
        </ItemCell>
      )}
      quantity={(
        <ItemCell>
          {`${quantity.toLocaleString()} ${unit}`}
        </ItemCell>
      )}
      unitPrice={(
        <ItemCell textAlign={'right'} color={unitPrice < 0 ? red[800] : undefined}>
          {`${unitPrice.toLocaleString()} 円`}
        </ItemCell>
      )}
      rowUnitPrice={(
        <ItemCell textAlign={'right'} color={unitPrice < 0 ? red[800] : undefined}>
          {`${rowUnitPrice.toLocaleString()} 円`}
        </ItemCell>
      )}
      rowCostPrice={(
        <ItemCell textAlign={'right'} color={unitPrice < 0 ? red[800] : undefined}>
          {`${rowCostPrice.toLocaleString()} 円`}
        </ItemCell>
      )}
      rowDetails={(
        <ItemCell>
          {rowDetails}
        </ItemCell>
      )}
    />
  );
};