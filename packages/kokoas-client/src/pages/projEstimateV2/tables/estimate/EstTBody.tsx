import { TableBody } from '@mui/material';
import { 
  useMemo,
  // MouseEvent, 
  // useCallback, 
  useState, 
} from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { TypeOfForm, KeyOfForm } from '../../form';
import { EstTRow } from './EstTRow';
import { UnitTypeMenu } from './rowFields/UnitTypeMenu';

//import { EstTRow } from './EstTRow';

const name: KeyOfForm = 'items';

export const EstTBody = ({
  control,
  isDisabled,
}: {
  control: Control<TypeOfForm> 
  isDisabled: boolean,
}) => {

  
  const { fields: rows } = useFieldArray({
    control,
    name,
  });

  

  const [unitMenuAnchorEl, setUnitMenuAnchorEl] = useState<null | HTMLButtonElement>(null);

  /*  const handleOpenUnitMenu = useCallback(({ currentTarget }: MouseEvent<HTMLButtonElement>) => {
    setUnitMenuAnchorEl(currentTarget);

  }, []); */

  const handleClose = ( value?: string) => {
    if (unitMenuAnchorEl?.name && !!value) {
      //setFieldValue(unitMenuAnchorEl.name, value, false);
    }
    setUnitMenuAnchorEl(null);
  };

  const rowsLength = useMemo(() => rows.length, [rows]);

  return (

    <TableBody>

      {rows.map((row, rowIdx) => {

        const isAtBottom = rowIdx === (rowsLength - 1);
        
        return (

          <EstTRow
            rowIdx={rowIdx}
            control={control}
            key={row.id}
            isAtBottom={isAtBottom}
            isVisible={!isDisabled}
            rowsLength={rowsLength}
            //envStatus={envStatus}
            //handleOpenUnitMenu={handleOpenUnitMenu}
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