import { TableCell, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ComponentProps } from 'react';


export interface QtHeadCellProps extends ComponentProps<typeof TableCell> {
  text?: string | string[],
  required?: boolean
  rightAligned?: boolean,
}

/**
 * 特化したTableCellです。
 * 他のpropsはTableCellをご参照ください
 *
 * @param {QtHeadCellProps} props
 * @returns JSX
 */
export const QtHeadCell = (props: QtHeadCellProps) => {
  const {
    text = '',
    required,
    rightAligned,
    ...others } = props;

  if (!text) {
    return (
      <TableCell {...others} />
    );
  }

  return (
    <TableCell
      {...others}
      align={rightAligned ? 'right' : others.align}
    >

      {

        ([] as string[])
          .concat(text)
          .map((item) => (
            <div key={item}>
              <Typography
                color={grey[600]}
                fontWeight={500}
                component={'span'}
                noWrap
              >
                {item}
              </Typography>
              {required && (
              <Typography
                ml={1}
                fontSize={16}
                color={'red'}
                component={'span'}
              >
                {'*'}
              </Typography>
              )}
            </div>
          ))

      }

    </TableCell>
  );
};