/* eslint-disable no-nested-ternary */
import { useOverlayContext } from 'kokoas-client/src/hooks/useOverlayContext';
import { useFieldArray } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box, Stack } from '@mui/material';
import { EstRow } from './EstRow';
import { useManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { useSmartHandlers } from '../../hooks/useSmartHandlers';

export const EstContents = ({
  isDisabled,
}: {
  isDisabled: boolean
}) => {

  const fieldArrayHelpers = useFieldArray<TypeOfForm>({
    name: 'items',
  });
    
  const overlayRef = useOverlayContext();
  const { fields: items } = fieldArrayHelpers;

  const rowMethods = useManipulateItemRows(fieldArrayHelpers);
  const smartHandlers = useSmartHandlers();

  const {
    rowsCount,
  } = rowMethods;
  const rowVirtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => overlayRef.current,
    estimateSize: () => 100,
    overscan: 5,
  }); 

  return (
    <Box
      sx={{
        height: `${rowVirtualizer.getTotalSize()}px`,
        width: '100%',
        position: 'relative',
        '& > div': {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
        },
      }}
    >
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const item = items[virtualRow.index];
        const isAtBottom = virtualRow.index === (rowsCount - 1);
        return (
          <Stack direction={'column'}
            key={virtualRow.index}
            style={{
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
          >
            <EstRow
              {...rowMethods} 
              id={item.id}
              rowIdx={virtualRow.index} 
              smartHandlers={smartHandlers}
              isAtBottom={isAtBottom}
              isVisible={!isDisabled}
            />
          </Stack>
        );
      })}
    </Box>
  );
};