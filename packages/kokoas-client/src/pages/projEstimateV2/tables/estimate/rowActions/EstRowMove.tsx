import { IconButton, Stack, SxProps, Theme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import {
  useState,
} from 'react';
import { EstRowMoveAnywhere } from './EstRowMoveAnywhere';
import { UseManipulateItemRows } from '../../../hooks/useManipulateItemRows';
import { StackProps } from '@mui/system';


export const EstRowMove = ({
  rowIdx,
  isVisible,
  isAtBottom,
  rowsCount,
  handleMoveRowUp,
  handleMoveRowDown,
  handleMoveAnywhere,
  stackProps,
}: UseManipulateItemRows & {
  rowIdx: number,
  isVisible: boolean,
  isAtBottom: boolean,
  stackProps?: StackProps
}) => {
  const [expandBtns, setExpandBtns] = useState(false);

  const transitionStyle = (isTop: boolean): SxProps<Theme> => {
    const shiftPx = isTop ? -14 : 14;
    return {
      top: expandBtns ? shiftPx : 0,
      transition: 'top 0.5s ease 0s',
      position: 'relative',
    };
  };

  const isAtTop = rowIdx === 0;


  return (

    <Stack spacing={-2}
      {...stackProps}
      onMouseEnter={() => setExpandBtns(true)}
      onMouseLeave={() => setExpandBtns(false)}
    >
      {/* 上に移動 */}
      {isVisible &&
        <IconButton
          size='small'
          disabled={isAtTop}
          onClick={() => handleMoveRowUp(rowIdx)}
          sx={transitionStyle(true)}
        >
          <KeyboardArrowUpIcon />
        </IconButton>}

      {/* どこでも移動 */}
      <EstRowMoveAnywhere
        rowIdx={rowIdx}
        rowsCount={rowsCount}
        resetArrowsAnimation={() => setExpandBtns(false)}
        handleMoveAnywhere={handleMoveAnywhere}
        visible={isVisible}
      />

      {/* 下に移動 */}
      {isVisible &&
        <IconButton
          size='small'
          disabled={isAtBottom}
          onClick={() => handleMoveRowDown(rowIdx)}
          sx={transitionStyle(false)}
        >
          <KeyboardArrowDownIcon />
        </IconButton>}

    </Stack>

  );
};