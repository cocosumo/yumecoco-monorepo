import { Stack } from '@mui/material';
import { Title } from './Title';
import { ResultTable } from './resultTable/ResultTable';


import styles from './Results.module.css';


export const Results = () => {
  
  return (
    
    <Stack
      spacing={2}
      id='printNode'
      className={styles.printNode}
    >
      <Title />
      <ResultTable />
     
    </Stack>
  );
};