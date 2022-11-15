import { TableBody } from '@mui/material';
import { FieldArrayRenderProps } from 'formik';
import { TypeOfForm } from '../form';
import { QuoteTableRow } from './QuoteTableRow';



export  function QuoteTableBody(props: {
  arrayHelpers: FieldArrayRenderProps,
}) {
  const { arrayHelpers } = props;
  const { form } = arrayHelpers;
  const { items, envStatus } = form.values as TypeOfForm;


  return (

    <TableBody>
      {items.map((item, itemsIdx) => {
        return (
            
          <QuoteTableRow
            rowIdx={itemsIdx}
            arrayHelpers={arrayHelpers}
            key={item.key}
            envStatus={envStatus}
          />
        );
      })}
    </TableBody>
  ); 
  
}