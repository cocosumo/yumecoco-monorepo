import { TableRow } from '@mui/material';
import { FieldArrayRenderProps } from 'formik';
import { TypeOfForm } from '../form';
import { useMaterials } from '../hooks/useMaterials';
import { RowContent } from './RowContent';

export type RenderRowsProps = {
  arrayHelpers: FieldArrayRenderProps,
  values: TypeOfForm,
};

export default function RenderRows(props: RenderRowsProps) {
  const { arrayHelpers, values } = props;
  const { majorItems, middleItems, materials } = useMaterials();

  return (
    (values.items && (values.items.length > 0)) ?
      (
        <>
          {values.items.map((item, itemsIdx) => {
            return (
              <RowContent
                rowIdx={itemsIdx}
                currentItem={item}
                arrayHelpers={arrayHelpers}
                materialOptions={{
                  majorItems: majorItems.data ?? [],
                  middleItems: middleItems.data ?? [],
                  materials: materials.data ?? [],
                }}
                key={item.key}
              />
            );
          })}
        </>
      ) : (
        <TableRow />
      )
  );
}