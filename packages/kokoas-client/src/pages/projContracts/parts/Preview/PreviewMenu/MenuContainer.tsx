import { Button,  Menu } from '@mui/material';
import { MouseEvent, useState } from 'react';
import MoreIcon from '@mui/icons-material/More';
import { MenuVoidContract } from './MenuVoidContract';
import { MenuExcel } from './MenuExcel';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../../form';

export const MenuContainer = () => {

  const { values } = useFormikContext<TypeOfForm>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const {
    envelopeStatus,
  } = values;

  const handleClose = () => setAnchorEl(null);

  const isWithContract = !!envelopeStatus;
  const isVoidable = envelopeStatus === 'sent';

  return (
    <div>
      {isWithContract &&  (
        <>

          <Button
            id="basic-button"
            color='secondary'
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <MoreIcon />
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuExcel />

            {isVoidable && <MenuVoidContract handleClose={handleClose} />}

          </Menu>
        </>)}
    </div>
  );
};