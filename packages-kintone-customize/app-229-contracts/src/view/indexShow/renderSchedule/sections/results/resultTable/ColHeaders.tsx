import { TableCell, TableHead, TableRow } from '@mui/material';
import { ColHeaderProjTypes } from './monthRow/ColHeadersProjTypes';
import { IgnoredCell } from './common/IgnoredCell';
import { blue } from '@mui/material/colors';
import styles from './ColHeaders.module.css';

export const ColHeaders = () => {
  return (
    <TableHead>

      <TableRow>

        <IgnoredCell 
          width={40} 
          rowSpan={2}
          bgColor='white'
        />

        <TableCell 
          width={80} 
          rowSpan={2} align='center'
          className={styles.eventCol}
        >
          行事
          <br />
          イベント
        </TableCell>

        <IgnoredCell 
          width={80} 
          rowSpan={2}
          bgColor={blue[50]}
        />

        <TableCell align='center' colSpan={5}>
          売上目標									
        </TableCell>

        <TableCell align='center' rowSpan={2}>
          合計	
        </TableCell>

        
        <TableCell 
          align='center' 
          rowSpan={2}
          className={styles.adsExpenses}
        >
          広告宣伝費等	

        </TableCell>

        <TableCell align='center' rowSpan={2}>
          その他経費          
        </TableCell>
        
        <TableCell 
          align='center' 
          rowSpan={2}
          className={styles.commision}
        >
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