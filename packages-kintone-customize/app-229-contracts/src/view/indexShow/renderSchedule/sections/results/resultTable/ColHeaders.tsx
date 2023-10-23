import { TableCell, TableHead, TableRow } from '@mui/material';
import { ColHeaderProjTypes } from './monthRow/ColHeadersProjTypes';

export const ColHeaders = () => {
  return (
    <TableHead>

      <TableRow>

        <TableCell width={80} rowSpan={2} />

        <TableCell width={80} rowSpan={2} align='center'>
          行事/イベント
        </TableCell>

        <TableCell rowSpan={2} />

        <TableCell align='center' colSpan={5}>
          売上目標									
        </TableCell>

    

        <TableCell align='center' rowSpan={2}>
          合計	
        </TableCell>

        
        <TableCell align='center' rowSpan={2}>
          広告宣伝費等	

        </TableCell>

        <TableCell align='center' rowSpan={2}>
          その他経費          
        </TableCell>
        
        <TableCell align='center' rowSpan={2}>
          夢てつ紹介料	          
        </TableCell>
        {/* 
        <TableCell align='center' rowSpan={2}>
          その他取組	          
        </TableCell> */}


      </TableRow>

      <ColHeaderProjTypes />

      
    </TableHead>
  );
};