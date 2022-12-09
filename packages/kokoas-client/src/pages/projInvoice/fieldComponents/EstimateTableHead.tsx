import { TableCell, TableRow } from '@mui/material';

export const EstimateTableHead = ({
  projTypeName,
}: {
  projTypeName: string
}) => {
  return (
    <TableRow>
      <TableCell>
        {projTypeName}
      </TableCell>      
      <TableCell>
        {'枝番'}
      </TableCell>  
      <TableCell>
        {'契約金額'}
      </TableCell>  
      <TableCell>
        {'請求済み金額'}
      </TableCell>  
      <TableCell>
        {'請求に使用する'}
      </TableCell>
    </TableRow>
  );
};