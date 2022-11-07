import { Button, ButtonProps, Dialog, DialogTitle } from '@mui/material';
import { ReactNode, useCallback, useState } from 'react';
import { IProjects } from 'types';
import { SelectProjInCustGroupContent } from './SelectProjInCustGroupContent';

export const SelectProjectInCustGroup = ({
  custGroupId,
  onChange,
  buttonProps,
  buttonChildren,
  buttonIcon,
  dialogTitle = '編集する工事を選択してください',
}: {
  dialogTitle?: ReactNode,
  buttonChildren?: ReactNode,
  buttonProps?: ButtonProps,
  buttonIcon?: ReactNode,
  custGroupId?: string
  onChange: (projRecord: IProjects) => void
}) => {

  const {
    children = buttonChildren ?? '工事情報の選択',
    disabled = !custGroupId,
    startIcon = buttonIcon,
    ...otherButtonProps
  } = buttonProps || {};

  const [open, setOpen] = useState(false);

  const handleClose = useCallback(() => setOpen(false), []);
  const handleOpen = useCallback(() => setOpen(true), []);

  return (
    <>
      <Button
        {...otherButtonProps}
        variant='contained'
        color={'secondary'}
        onClick={handleOpen}
        disabled={disabled}
        startIcon={startIcon}
      
      >
        {children}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={'md'}
      >
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>

        <SelectProjInCustGroupContent
          custGroupId={custGroupId || ''}
          handleClose={handleClose}
          onChange={onChange}
        />

      </Dialog>
    </>
  );
};