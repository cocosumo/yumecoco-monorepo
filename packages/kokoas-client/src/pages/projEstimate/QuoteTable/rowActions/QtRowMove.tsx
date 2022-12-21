import { IconButton, Stack, SxProps, Theme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import { useCallback, useState } from 'react';
import { QtRowMoveAnywhere } from './QtRowMoveAnywhere';
import { useMoveItem } from '../../hooks/useMoveItem';


export const QtRowMove = ({
  rowIdx,
}: {
  rowIdx: number
}) => {
  const { values: { envStatus, items } } = useFormikContext<TypeOfForm>();
  const [expandBtns, setExpandBtns] = useState(false);

  const transitionStyle = (isTop: boolean): SxProps<Theme> => {
    const shiftPx = isTop ? -14 : 14;
    return {
      top: expandBtns ? shiftPx : 0,
      transition: 'top 0.5s ease 0s',
      position: 'relative',
    };
  };

  const move = useMoveItem();

  const isAtBottom = rowIdx === (items.length - 1);
  const isAtTop = rowIdx === 0;
  const isVisible = !envStatus;

  const handleMoveRowUp = useCallback(() => move(rowIdx, rowIdx - 1), [move, rowIdx]);

  const handleMoveRowDown = useCallback(() => move(rowIdx, rowIdx + 1), [move, rowIdx]);

  return (

    <Stack spacing={-2}
      onMouseEnter={() => setExpandBtns(true)}
      onMouseLeave={() => setExpandBtns(false)}
    >
      {/* 上に移動 */}
      {isVisible &&
        <IconButton
          size='small'
          disabled={isAtTop}
          onClick={handleMoveRowUp}
          sx={transitionStyle(true)}
        >
          <KeyboardArrowUpIcon />
        </IconButton>}

      {/* どこでも移動 */}
      <QtRowMoveAnywhere
        rowIdx={rowIdx}
        rowsCount={items.length}
        resetArrowsAnimation={() => setExpandBtns(false)}
        move={move}
        visible={isVisible}
      />

      {/* 下に移動 */}
      {isVisible &&
        <IconButton
          size='small'
          disabled={isAtBottom}
          onClick={handleMoveRowDown}
          sx={transitionStyle(false)}
        >
          <KeyboardArrowDownIcon />
        </IconButton>}

    </Stack>



  );
};