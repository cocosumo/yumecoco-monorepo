import { Box, BoxProps, PopperProps, SxProps } from '@mui/material';
import { grey } from '@mui/material/colors';
import {  useCallback, SyntheticEvent, useState, useMemo } from 'react';
import { ErrorPopover } from './utilities/ErrorPopover';
import { estArrayFieldName, KeyOfForm, TypeOfForm } from '../../form';
import { useFormContext } from 'react-hook-form';

export const EstBodyContainer = ({
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

  const sx: SxProps = useMemo(() => ({
    height: `${height}px`,
    width: '100%',
    position: 'relative',
    border:1,
    borderColor: grey[200],
    borderRadius: 1,
  }), [height]);

  return (
    <Box
      sx={sx}
      onMouseOver={handleMouseOver}
    >
      {children}
      <ErrorPopover 
        ancholErrEl={ancholErrEl}
        errorMessage={errorMessage}
      />
    </Box>
  );
};