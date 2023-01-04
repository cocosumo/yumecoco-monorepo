/* eslint-disable no-nested-ternary */
import { useOverlayContext } from 'kokoas-client/src/hooks/useOverlayContext';
import { useFieldArray } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box, Stack } from '@mui/material';
import { useManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { EstRowMove } from '../estimate/rowActions/EstRowMove';
import { EstRowManipulate } from '../estimate/rowActions/EstRowManipulate';
import { EstRow } from './EstRow';
import { useSmartHandlers } from '../../hooks/useSmartHandlers';
import { EstHeader } from './EstHeader';

export const EstBody = ({
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
    paddingStart: 80,
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
          minWidth: '600px',
        },
      }}
    >
      <EstHeader />
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const item = items[virtualRow.index];
        const isAtBottom = virtualRow.index === (rowsCount - 1);
        return (
          <Stack 
            spacing={1} 
            key={virtualRow.index}
            sx={{
              height: `${virtualRow.size}px`,
              transform: `translateY(${virtualRow.start}px)`,
            }}
            direction={'row'}
            justifyContent={'space-between'}
          >
            <EstRowMove
              {...rowMethods}
              isAtBottom={isAtBottom}
              isVisible={!isDisabled}
              rowIdx={virtualRow.index}
              stackProps={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            />
            <EstRow 
              id={item.id}
              rowIdx={virtualRow.index}
              isAtBottom={isAtBottom}
              isVisible={!isDisabled}
              smartHandlers={smartHandlers}
            />
           
            <EstRowManipulate 
              {...rowMethods}
              rowIdx={virtualRow.index} 
              stackProps={{
                display: 'flex',
                justifyContent: 'flex-start',
              }}
            />
          </Stack>
        );
      })}
    </Box>
  );
};