import { FieldArrayWithId } from 'react-hook-form';
import { TypeOfForm } from '../../../form';
import { EstRowFormat } from '../EstRowFormat';
import { EstCell } from './EstCell';

export const EstRowReadOnly = ({
  item,
}:{
  item: FieldArrayWithId<TypeOfForm, 'items', 'id'>
})  => {
  const {
    majorItem,
    middleItem,
    material,
    materialDetails,
    costPrice,
    quantity,
    unit,
    materialProfRate,
    taxable,
    unitPrice,
    rowUnitPriceAfterTax,
    rowDetails,
  } = item;
  return (
    <EstRowFormat
      majorItem={(
        <EstCell>
          {majorItem}
        </EstCell>
      )}
      middleItem={(
        <EstCell>
          {middleItem}
        </EstCell>
      )}
      material={(
        <EstCell>
          {material}
        </EstCell>
      )}
      materialDetails={(
        <EstCell>
          {materialDetails}
        </EstCell>
      )}
      costPrice={(
        <EstCell textAlign={'right'}>
          {`${costPrice.toLocaleString()} 円`}
        </EstCell>
      )}
      quantity={(
        <EstCell>
          {`${quantity.toLocaleString()} ${unit}`}
        </EstCell>
      )}
      profitRate={(
        <EstCell>
          {`${materialProfRate} %`}
        </EstCell>
      )}
      taxType={(
        <EstCell>
          {`${taxable ? '課税' : '非課税'}`}
        </EstCell>
      )}
      unitPrice={(
        <EstCell textAlign={'right'}>
          {`${unitPrice.toLocaleString()} 円`}
        </EstCell>
      )}
      rowUnitPrice={(
        <EstCell textAlign={'right'}>
          {`${rowUnitPriceAfterTax.toLocaleString()} 円`}
        </EstCell>
      )}
      rowDetails={(
        <EstCell>
          {rowDetails}
        </EstCell>
      )}
    />
  );
};