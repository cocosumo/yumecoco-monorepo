import { TableBody } from '@mui/material';
import { useFormikContext } from 'formik';
import { MouseEvent, useState } from 'react';
import { TypeOfForm } from '../form';
import { QuoteTableRow } from './QuoteTableRow';
import { UnitTypeMenu } from './rowFields/UnitTypeMenu';



export const QuoteTableBody = () => {
  const { setFieldValue, values } = useFormikContext<TypeOfForm>();
  const { items, envStatus } = values;


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

};