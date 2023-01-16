import { Box, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useRef } from 'react';
import {  ParsedDaikokuGenka } from 'types';
import { NextButton } from '../NextButton';
import { ItemRow } from './ItemRow';
import { ItemsBodyContainer } from './ItemsBodyContainer';
import { ItemsRowContainer } from './ItemsRowContainer';
import { ItemsTHead } from './ItemsTHead';

export const StepCheckItems = (
  {
    parsedDaikoku,
    handleNext,
  }: {
    parsedDaikoku: ParsedDaikokuGenka,
    handleNext: () => void,
  },
) => {

  const parentRef = useRef<Element | null>(null);
  const { items } = parsedDaikoku || {};

  // The virtualizer
  const rowVirtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 80,
    paddingStart: 60,
  });


  return (
    <Stack
      height={'100%'}
      width={'100%'}
      p={2}
      spacing={2}
    >
      <Box
        ref={parentRef}
        sx={{
          border:1,
          borderColor: grey[200],
          borderRadius: 1,
          height: '80%',
          width: '100%',
          overflow: 'auto',
          scrollbarGutter: 'stable',

        }}
      >

        <ItemsBodyContainer
          height={rowVirtualizer.getTotalSize()}
        >
          <ItemsTHead />
          {rowVirtualizer.getVirtualItems().map((virtualItem) => {
            const item = items[virtualItem.index];

            return (
              <ItemsRowContainer
                rowIdx={virtualItem.index}
                rowSize={virtualItem.size}
                rowStart={virtualItem.start}
                key={virtualItem.key}
              >
                <Typography px={1}>
                  {virtualItem.index + 1}
                </Typography>
                <ItemRow item={item} />
                <div />
              </ItemsRowContainer>
            );
          },
          )}

        </ItemsBodyContainer>

      </Box>
      <NextButton
        onClick={handleNext}
      >
        アップロード
      </NextButton>

    </Stack>
  );
};