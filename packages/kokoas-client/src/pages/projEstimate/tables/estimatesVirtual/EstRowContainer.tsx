import { Stack, StackProps } from '@mui/material';
import { grey, yellow } from '@mui/material/colors';
import { FocusEvent, FocusEventHandler, useCallback } from 'react';

export const EstRowContainer = (props: StackProps & {
  isAtBottom: boolean,
  rowIdx: number,
  rowSize: number,
  rowStart: number,
  handleRowFocus: (rowIdx: number, e: FocusEvent<HTMLDivElement, Element>) => void
}) => {

  const {
    isAtBottom,
    rowIdx,
    rowSize,
    rowStart,
    handleRowFocus,
    ...otherProps
  } = props;

  const memoOnFocus: FocusEventHandler<HTMLDivElement> = useCallback((e) => {
    handleRowFocus(rowIdx, e);
  }, [handleRowFocus, rowIdx]);


  return (
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      py={2}
      spacing={1}
      onFocus={memoOnFocus}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        minWidth: '600px',
        opacity: isAtBottom ? 0.5 : undefined,
        background: rowIdx % 2 ? grey[50] : undefined,
        '&:hover': isAtBottom ? {
          opacity: 1,
        } : undefined,
        '&:focus-within': {
          background: yellow[50],
          opacity: isAtBottom ? 1 : undefined,
        },
        transition: 'all 0.5s',
        height: `${rowSize}px`,
      }}
      style={{
        transform: `translateY(${rowStart}px)`,
      }}
      {...otherProps}
    />);
};