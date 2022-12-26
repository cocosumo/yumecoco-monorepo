import { IconButton, Stack, SxProps, Theme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
  useCallback,
  //useCallback,
  useState,
} from 'react';
import { EstRowMoveAnywhere } from './EstRowMoveAnywhere';
import { UseFieldArrayMove } from 'react-hook-form';
//import { useMoveItem } from '../../hooks/useMoveItem';


export const EstRowMove = ({
  rowIdx,
  isVisible,
  isAtBottom,
  rowLength,
  move,
}: {
  rowIdx: number,
  isVisible: boolean,
  isAtBottom: boolean,
  rowLength: number,
  move: UseFieldArrayMove
}) => {
  //const { values: { envStatus, items } } = useFormikContext<TypeOfForm>();
  const [expandBtns, setExpandBtns] = useState(false);

  const transitionStyle = (isTop: boolean): SxProps<Theme> => {
    const shiftPx = isTop ? -14 : 14;
    return {
      top: expandBtns ? shiftPx : 0,
      transition: 'top 0.5s ease 0s',
      position: 'relative',
    };
  };

  //const move = useMoveItem();

  //const isAtBottom = rowIdx === (items.length - 1);
  const isAtTop = rowIdx === 0;
  //const isVisible = !envStatus;

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
      <EstRowMoveAnywhere
        rowIdx={rowIdx}
        rowsCount={rowLength}
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