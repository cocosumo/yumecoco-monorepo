import { TableBody } from '@mui/material';
import { FieldArrayRenderProps } from 'formik';
import { TransitionGroup } from 'react-transition-group';
import { TypeOfForm } from '../form';
import { useMaterials } from '../hooks/useMaterials';
import { QuoteTableRow } from './QuoteTableRow';



export  function QuoteTableBody(props: {
  arrayHelpers: FieldArrayRenderProps,
}) {
  const { arrayHelpers } = props;
  const { form } = arrayHelpers;
  const { items } = form.values as TypeOfForm;

  const { majorItems, middleItems, materials } = useMaterials();

  return (

    <TableBody>
      <TransitionGroup component={null}>


        {items.map((item, itemsIdx) => {
          return (
            
            <QuoteTableRow
              rowIdx={itemsIdx}
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
      </TransitionGroup>
    </TableBody>
  ); 
  
}