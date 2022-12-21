import { TableBody } from '@mui/material';
import { FieldArrayRenderProps, useFormikContext } from 'formik';
import { MouseEvent, useState } from 'react';
import { TypeOfForm } from '../form';
import { QuoteTableRow } from './QuoteTableRow';
import { UnitTypeMenu } from './rowFields/UnitTypeMenu';



export  function QuoteTableBody(props: {
  arrayHelpers: FieldArrayRenderProps,
}) {
  const { setFieldValue } = useFormikContext<TypeOfForm>();
  const { arrayHelpers } = props;
  const { form } = arrayHelpers;
  const { items, envStatus } = form.values as TypeOfForm;

  const [unitMenuAnchorEl, setUnitMenuAnchorEl] = useState<null | HTMLButtonElement>(null);

  const handleOpenUnitMenu = ({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setUnitMenuAnchorEl(currentTarget);

  };

  const handleClose = ( value?: string) => {
    if (unitMenuAnchorEl?.name && !!value) {
      setFieldValue(unitMenuAnchorEl.name, value, false);
    }
    setUnitMenuAnchorEl(null);
  };

  return (

    <TableBody>
      {items.map((item, itemsIdx) => {

        return (

          <QuoteTableRow
            rowIdx={itemsIdx}
            arrayHelpers={arrayHelpers}
            key={item.key}
            envStatus={envStatus}
            handleOpenUnitMenu={handleOpenUnitMenu}
          />
        );
      })}
      <UnitTypeMenu
        open={!!unitMenuAnchorEl}
        anchorEl={unitMenuAnchorEl}
        handleClose={handleClose}
      />
    </TableBody>
  );

}