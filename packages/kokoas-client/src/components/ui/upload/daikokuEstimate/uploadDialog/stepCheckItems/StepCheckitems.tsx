import { Box, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo, useRef } from 'react';
import {  ParsedDaikokuGenka } from 'types';
import { calculate } from './helper/calculate';
import { ItemRow } from './ItemRow';
import { ItemsBodyContainer } from './ItemsBodyContainer';
import { ItemsRowContainer } from './ItemsRowContainer';
import { ItemsSummary } from './ItemsSummary';
import { ItemsTHead } from './ItemsTHead';
import { Submit } from './Submit';

export const StepCheckItems = (
  {
    projId,
    parsedDaikoku,
    handleNext,
  }: {
    projId: string,
    parsedDaikoku: ParsedDaikokuGenka,
    handleNext: () => void,
  },
) => {

  const parentRef = useRef<Element | null>(null);
  const { items } = parsedDaikoku || {};
  const { details, summary } = useMemo(() => calculate({ record: parsedDaikoku }), [parsedDaikoku]);

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
          height: '90%',
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
            const calculatedItem = details[virtualItem.index];

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
                <ItemRow
                  item={item}
                  calculatedItem={calculatedItem}
                />
                <div />
              </ItemsRowContainer>
            );
          },
          )}

        </ItemsBodyContainer>

      </Box>
      <Stack
        direction={'row'}
        spacing={2}
        justifyContent={'space-between'}
      >
        <ItemsSummary
          summary={summary}
          parsedDaikoku={parsedDaikoku}
        />

        <Submit
          projId={projId}
          handleNext={handleNext}
          parsedDaikoku={parsedDaikoku}
          details={details}
        />

      </Stack>
    </Stack>
  );
};