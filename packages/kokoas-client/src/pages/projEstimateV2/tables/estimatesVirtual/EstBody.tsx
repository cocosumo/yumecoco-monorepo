
import { useOverlayContext } from 'kokoas-client/src/hooks/useOverlayContext';
import { useFieldArray } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { useVirtualizer  } from '@tanstack/react-virtual';
import { Box, Stack } from '@mui/material';
import { useManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { EstRowMove, EstRowManipulate } from './rowActions';
import { EstRow } from './EstRow';
import { useSmartHandlers } from '../../hooks/useSmartHandlers';
import { EstHeader } from './EstHeader';
import { grey, yellow } from '@mui/material/colors';
import { EstFooterActions } from './EstFooterActions';
import { Fragment, useMemo } from 'react';
import debounce from 'lodash/debounce';

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

  const smartHandlers = useSmartHandlers();
  const rowMethods = useManipulateItemRows(
    fieldArrayHelpers, 
    smartHandlers.handleUpdateSummary,
  );


  const {
    rowsCount,
  } = rowMethods;

  /* 仮想化 */
  const rowVirtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => overlayRef.current,
    estimateSize: () => 120,
    overscan: 8,
    paddingStart: 92,
  }); 

  /* 入力中の行をヘッダーと合計欄の裏にならない対策として、スクロールさせる*/
  const handleRowFocus = useMemo(() => debounce((rowIdx: number) => {
    rowVirtualizer.scrollToIndex(rowIdx, { behavior: 'smooth', align: 'start' });
  }, 300), [rowVirtualizer]);

  return (
    <Fragment>
      <Box
        sx={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
          border:1,
          borderColor: grey[200],
          borderRadius: 1,
        }}
      >
        <EstHeader />
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          const isAtBottom = virtualRow.index === (rowsCount - 1);

          return (
            <Stack 
              key={item.id}
              direction={'row'}
              justifyContent={'space-between'}
              py={2}
              spacing={1}
              onFocus={() => handleRowFocus(virtualRow.index)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                minWidth: '600px',
                opacity: isAtBottom ? 0.5 : undefined,
                background: virtualRow.index % 2 ? grey[50] : undefined, 
                '&:hover': isAtBottom ? {
                  opacity: 1,
                } : undefined,  
                '&:focus-within': {
                  background: yellow[50],
                },
                transition: 'all 0.5s',
                height: `${virtualRow.size}px`,
              }}
              style={{
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <EstRowMove
                {...rowMethods}
                isAtBottom={isAtBottom}
                isVisible={!isDisabled}
                rowIdx={virtualRow.index}
                stackProps={{
                  visibility: isAtBottom ? 'hidden' : undefined,
                }}
              />
              <EstRow 
                id={item.id}
                rowIdx={virtualRow.index}
                isAtBottom={isAtBottom}
                isVisible={!isDisabled}
                smartHandlers={smartHandlers}
                rowMethods={rowMethods}
              />
           
              <EstRowManipulate 
                {...rowMethods}
                rowIdx={virtualRow.index} 
                stackProps={{
                  visibility: isAtBottom ? 'hidden' : undefined,
                }}
              />
            </Stack>
          );
        })}
      
      </Box>
      <EstFooterActions {...rowMethods} />
    </Fragment>
  );
};