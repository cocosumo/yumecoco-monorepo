import { IconButton, Stack, SxProps, Theme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { FieldArrayRenderProps, FormikProps } from 'formik';
import { TypeOfForm } from '../../form';
import { useState } from 'react';

export const QtRowMove = ({
  rowIdx, arrayHelpers,
}: {
  rowIdx: number
  arrayHelpers: FieldArrayRenderProps,
}) => {
  const [expandBtns, setExpandBtns] = useState(false);
  const { form, move } = arrayHelpers;
  const { values: { items } } = form as FormikProps<TypeOfForm>;

  const transitionStyle = (isTop: boolean) : SxProps<Theme> => {
    const shiftPx = isTop ? -14 : 14;
    return {
      top: expandBtns ? shiftPx : 0,
      transition: 'top 0.5s ease 0s',
      position: 'relative',
    };
  };

  const isAtBottom = rowIdx  === (items.length - 1);
  const isAtTop = rowIdx === 0;

  const handleMoveRowUp = () => move(rowIdx, rowIdx - 1);

  const handleMoveRowDown = () => move(rowIdx, rowIdx + 1);

  const handleMoveAny = () => {

  };

  return (

    <Stack spacing={-2}
      onMouseEnter={()=>setExpandBtns(true)}
      onMouseLeave={()=>setExpandBtns(false)}
    >
      <IconButton
        size='small'
        disabled={isAtTop}
        onClick={handleMoveRowUp}
        sx={transitionStyle(true)}
      >
        <KeyboardArrowUpIcon />
      </IconButton>

      <IconButton
        size='small'
        onClick={handleMoveAny}
      >
        {rowIdx + 1}
      </IconButton>

      <IconButton
        size='small'
        disabled={isAtBottom}
        onClick={handleMoveRowDown}
        sx={transitionStyle(false)}
      >
        <KeyboardArrowDownIcon />
      </IconButton>

    </Stack>



  );
};