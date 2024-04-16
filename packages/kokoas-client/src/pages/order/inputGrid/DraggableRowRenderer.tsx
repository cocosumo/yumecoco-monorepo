import { useDrag, useDrop } from 'react-dnd';
import clsx from 'clsx';
import { RenderRowProps, Row } from 'react-data-grid';
import { TItem } from '../schema';



interface DraggableRowRenderProps<R> extends RenderRowProps<R> {
  onRowReorder: (sourceIndex: number, targetIndex: number) => void;
}

export function DraggableRowRenderer<R extends TItem>({
  rowIdx,
  isRowSelected,
  className,
  onRowReorder,
  ...props
}: DraggableRowRenderProps<R>) {
  const [{ isDragging }, drag] = useDrag({
    type: 'ROW_DRAG',
    item: { index: rowIdx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: 'ROW_DRAG',
    drop({ index }: { index: number }) {
      onRowReorder(index, rowIdx);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const parsedClassName = clsx(className, {
    ['row-dragging']: isDragging,
    ['row-over']: isOver,
    ['has-order']: props.row.orderId,
  });
 
  return (
    <Row
      ref={(ref) => {
        if (ref) {
          drag(ref.firstElementChild);
        }
        drop(ref);
      }}
      rowIdx={rowIdx}
      isRowSelected={isRowSelected}
      className={parsedClassName}
      {...props}
    />
  );
}