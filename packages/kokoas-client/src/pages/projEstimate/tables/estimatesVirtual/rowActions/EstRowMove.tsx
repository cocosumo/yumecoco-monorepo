import { IconButton, Stack } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
  stackProps?: StackProps,
  rowsCount: number,
}) => {

  const isAtTop = rowIdx === 0;

  return (

    <Stack spacing={-2}
      {...stackProps}
      sx={{
        '& button': {
          top: 0,
          transition: 'top 0.5s ease 0s',
          position: 'relative',
        },
        '&:hover button:first-of-type': {
          top: -14,
        },
        '&:hover button:last-of-type': {
          top: 14,
        },
      }}
    >
      {/* 上に移動 */}
      {isVisible &&
        <IconButton
          size='small'
          disabled={isAtTop}
          onClick={() => handleMoveRowUp(rowIdx)}
        >
          <KeyboardArrowUpIcon />
        </IconButton>}

      {/* どこでも移動 */}
      <EstRowMoveAnywhere
        rowIdx={rowIdx}
        rowsCount={rowsCount}
        handleMoveAnywhere={handleMoveAnywhere}
        visible={isVisible}
      />

      {/* 下に移動 */}
      {isVisible &&
        <IconButton
          size='small'
          disabled={isAtBottom}
          onClick={() => handleMoveRowDown(rowIdx)}
        >
          <KeyboardArrowDownIcon />
        </IconButton>}

    </Stack>

  );
};