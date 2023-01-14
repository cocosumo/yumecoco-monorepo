import { ParsedDaikokuEst } from 'types';
import { ItemCell } from './ItemCell';
import { ItemRowFormat } from './ItemRowFormat';

export const ItemRow = ({
  item,
}:{
  item: ParsedDaikokuEst['items'][number]
})  => {
  const {
    majorItem,
    middleItem,
    material,
    quantity,
    unitPrice,
    unit,
    amount,
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
      quantity={(
        <ItemCell>
          {`${quantity.toLocaleString()} ${unit}`}
        </ItemCell>
      )}
      unitPrice={(
        <ItemCell textAlign={'right'}>
          {`${unitPrice.toLocaleString()} 円`}
        </ItemCell>
      )}
      amount={(
        <ItemCell textAlign={'right'}>
          {`${amount.toLocaleString()} 円`}
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