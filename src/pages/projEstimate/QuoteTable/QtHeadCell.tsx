import { FormHelperText, TableCell, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { ComponentProps } from 'react';


export interface QtHeadCellProps extends ComponentProps<typeof TableCell> {
  text: string,
  required?: boolean
  rightAligned?: boolean,
  helperText?: string,
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
    text,
    required, 
    rightAligned, 
    helperText,
    ...others } = props;
    
  return (
    <TableCell 
      {...others} 
      align={rightAligned ? 'right' : others.align}
    >
    
      <Typography 
        color={grey[600]} 
        fontWeight={500} 
        component={'span'}
        noWrap
      >
        {text}
      </Typography>
  
      {required && (
      <Typography 
        ml={1} 
        fontSize={16} 
        color={'red'}
        component={'span'}
      >
          {'*'}
      </Typography>)}
      
      {helperText && 
      <FormHelperText 
        sx={{ 
          m: 0, 
          top: -5, 
          position: 'relative', 
          whiteSpace: 'nowrap',
        }}
      >
        {helperText}
      </FormHelperText>}


    </TableCell>
  );
};