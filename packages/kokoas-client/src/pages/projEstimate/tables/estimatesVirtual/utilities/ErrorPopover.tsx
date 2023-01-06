import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { FieldError, useFormContext, useFormState } from 'react-hook-form';
import { TypeOfForm } from '../../../form';
import { useCallback, useEffect, useState } from 'react';

export const ErrorPopover = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const { control } = useFormContext<TypeOfForm>();
  const { errors: { items } } = useFormState({
    control,
    name: 'items',
  });
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? 'error-popover' : undefined;

  useEffect(() => {

    const firstError = items?.find?.(Boolean);

    if (firstError) {
      const errorField = Object.values(firstError)[0] as FieldError;
      const ref = errorField.ref;
      setAnchorEl(ref as HTMLElement);
      setErrorMessage(errorField?.message);
    } else {
      handleClose();
    }
  }, [handleClose, items]);

  return (

    <Popover
      id={id}
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      disableAutoFocus={true}
      disableEnforceFocus={true}
    >
      <Typography sx={{ p: 2 }}>
        {errorMessage}
      </Typography>
    </Popover>

  );
};
