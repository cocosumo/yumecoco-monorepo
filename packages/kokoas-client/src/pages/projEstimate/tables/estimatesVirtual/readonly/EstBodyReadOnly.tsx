import { useVirtualizer } from '@tanstack/react-virtual';
import { useOverlayContext } from 'kokoas-client/src/hooks/useOverlayContext';
import { useFieldArray } from 'react-hook-form';
import { TypeOfForm } from '../../../form';
import { EstBodyContainer } from '../EstBodyContainer';
import { EstHeader } from '../EstHeader';
import { EstRowContainerReadOnly } from './EstRowContainerReadOnly';
import { EstRowReadOnly } from './EstRowReadOnly';

export const EstBodyReadOnly = () => {


  const { fields: items } = useFieldArray<TypeOfForm>({
    name: 'items',
  });
  const overlayRef = useOverlayContext();

  const rowsCount = items.length;
  const rowVirtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => overlayRef.current,
    estimateSize: () => 60,
    overscan: 5,
    paddingStart: 60,
  });

  return (
    <EstBodyContainer height={rowVirtualizer.getTotalSize()}>
      <EstHeader />
      {rowVirtualizer.getVirtualItems().map((virtualRow) => {
        const item = items[virtualRow.index];

        return (
          <EstRowContainerReadOnly
            key={item.id}
            rowIdx={virtualRow.index}
            rowSize={virtualRow.size}
            rowStart={virtualRow.start}
          >
            <div />
            <EstRowReadOnly item={item} />
            <div />
          </EstRowContainerReadOnly>
        );
      })}
    </EstBodyContainer>
  );
};