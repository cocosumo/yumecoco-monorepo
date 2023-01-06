import { FieldError, useFormContext, useFormState } from 'react-hook-form';
import { KeyOfForm, TypeOfForm } from '../../../form';
import { useCallback, useEffect, useState } from 'react';
import { Alert, Popper, PopperProps } from '@mui/material';

const EstTableFieldName : KeyOfForm = 'items';

export const ErrorPopover = () => {
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<PopperProps['anchorEl']>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>('');

  const { control } = useFormContext<TypeOfForm>();

  const { errors: { items } } = useFormState({
    control,
    name: EstTableFieldName,
  });

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const activeElement = document.activeElement;


  useEffect(() => {

    const activeElementName = activeElement?.getAttribute('name');

    if (!activeElementName
      || !activeElementName.includes(EstTableFieldName)
    ) {
      handleClose();
      return;
    }

    const activeErrorField = items?.reduce?.((acc, curr) => {
      if (curr) {
        for (const field of Object.values(curr)) {
          if ((field as FieldError).ref?.name === activeElementName) {
            acc = field as FieldError;
          }
        }
      }
      return acc;
    }, Object.create(null) as FieldError);

    const actualErrorField = document.querySelector(`[name="${activeElementName}"]`);

    if (!actualErrorField || !activeErrorField) {
      handleClose();
      return;
    }

    const getBoundingClientRect = () =>
      actualErrorField.getBoundingClientRect();

    console.log(getBoundingClientRect());
    setOpen(true);
    setAnchorEl({ getBoundingClientRect });
    setErrorMessage(activeErrorField?.message || '');

  }, [handleClose, items, activeElement]);

  return (
    <Popper
      id={'popper'}
      open={open}
      //disablePortal={false}
      placement="bottom-start"
      transition
      sx={(theme) => ({
        zIndex: theme.zIndex.appBar + 1,
      })}
      anchorEl={anchorEl}
    >
      <Alert severity="error">
        {errorMessage}
      </Alert>
    </Popper>

  );
};
