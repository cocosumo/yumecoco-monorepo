import {  BoxProps, PopperProps } from '@mui/material';
import {  useCallback, SyntheticEvent, useState } from 'react';
import { ErrorPopover } from './utilities/ErrorPopover';
import { estArrayFieldName, KeyOfForm, TypeOfForm } from '../../form';
import { useFormContext } from 'react-hook-form';
import { EstBodyContainer } from './EstBodyContainer';

export const EstBodyContainerEditable = ({
  height,
  children,
}: BoxProps & {
  height: number,
}) => {

  const [ancholErrEl, setAnchorErrEl] = useState<PopperProps['anchorEl']>();
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const { getFieldState } = useFormContext<TypeOfForm>();

  const handleMouseOver: BoxProps['onMouseOver'] = useCallback((e:  SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    if (target?.tagName === 'INPUT' && target?.name?.includes(estArrayFieldName)) {
      const { error } = getFieldState(target.name as KeyOfForm);
      if (error) {
        setAnchorErrEl(target);
        setErrorMessage(error?.message);
      }
    } else if (ancholErrEl) {
      setAnchorErrEl(undefined);
    }
  }, [getFieldState, ancholErrEl ]);

  return (
    <EstBodyContainer
      height={height}
      onMouseOver={handleMouseOver}
    >
      {children}
      <ErrorPopover
        ancholErrEl={ancholErrEl}
        errorMessage={errorMessage}
      />
    </EstBodyContainer>
  );
};