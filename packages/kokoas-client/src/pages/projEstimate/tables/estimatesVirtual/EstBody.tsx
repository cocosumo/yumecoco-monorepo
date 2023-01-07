
import { useOverlayContext } from 'kokoas-client/src/hooks/useOverlayContext';
import { useFieldArray } from 'react-hook-form';
import { TypeOfForm } from '../../form';
import { useVirtualizer  } from '@tanstack/react-virtual';
import { useManipulateItemRows } from '../../hooks/useManipulateItemRows';
import { EstRowMove, EstRowManipulate } from './rowActions';
import { EstRow } from './EstRow';
import { useSmartHandlers } from '../../hooks/useSmartHandlers';
import { EstHeader } from './EstHeader';
import { EstFooterActions } from './EstFooterActions';
import { Fragment, useMemo } from 'react';
import debounce from 'lodash/debounce';
import { EstRowContainer } from './EstRowContainer';
import { EstBodyContainer } from './EstBodyContainer';

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

  /* 仮想化設定 */
  const rowVirtualizer = useVirtualizer({
    count: rowsCount,
    getScrollElement: () => overlayRef.current,
    estimateSize: () => 110,
    overscan: 5,
    paddingStart: 92,
    scrollPaddingStart: -92, // これが無いと、編集中の行のフォーカスが外れる。
  });

  /* 入力中の行をヘッダーと合計欄の裏にならない対策として、スクロールさせる*/
  const handleRowFocus = useMemo(() => debounce((rowIdx: number) => {
    rowVirtualizer.scrollToIndex(rowIdx, { behavior: 'smooth', align: 'start' });
  }, 300), [rowVirtualizer]);

  return (
    <Fragment>
      <EstBodyContainer
        height={rowVirtualizer.getTotalSize()}
      >
        <EstHeader />
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const item = items[virtualRow.index];
          const isAtBottom = virtualRow.index === (rowsCount - 1);

          return (
            <EstRowContainer
              key={item.id}
              handleRowFocus={handleRowFocus}
              isAtBottom={isAtBottom}
              rowIdx={virtualRow.index}
              rowSize={virtualRow.size}
              rowStart={virtualRow.start}

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
            </EstRowContainer>
          );
        })}

      </EstBodyContainer>
      <EstFooterActions {...rowMethods} />

    </Fragment>
  );
};