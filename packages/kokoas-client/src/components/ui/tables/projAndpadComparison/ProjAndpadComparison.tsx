import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import type { SaveProjectData, SaveProjectDataKeys } from 'api-andpad';
import { useCustGroupById, useProjById } from 'kokoas-client/src/hooksQuery';


const fieldMap : [string, string, SaveProjectDataKeys][] = [
  ['顧客番号', 'custGroupId', '顧客管理ID'],
  ['顧客名', 'custNames', '顧客名'],
  ['工事ID', 'projId', '案件管理ID'],
  ['工事名', 'projName', '案件名'], 
  ['店舗', 'store', 'ラベル:店舗'],
];

/**
 * Compare cocoas project with andpad project
 * 
 */
export const AndpadProjComparison = ({
  projId,
  andpadRecord,
}:{
  projId: string,
  andpadRecord: SaveProjectData,
}) => {

  const { data: cocoasRecord } = useProjById(projId);
  const { data: custGroupRec } = useCustGroupById(projId);

  const custNames = custGroupRec?.members.value.map((m) => m.value.customerName.value).join('、');

  const normalizedRecord = {
    custGroupId: cocoasRecord?.custGroupId.value,
    custNames: custNames,
    projId: cocoasRecord?.uuid.value,
    projName: cocoasRecord?.projName.value,
    store: cocoasRecord?.store.value,
  };


  
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            {
            ['フィールド名', 'ここあす', 'アンドパッド'].map((v) => (
              <TableCell 
                sx={{
                  whiteSpace: 'nowrap',
                }}
                key={v}
              >
                {v}
              </TableCell>
            ))
          }
          </TableRow>
        </TableHead>
        <TableBody>
          {cocoasRecord && (
            fieldMap.map(([label, cocoasKey, andpadKey]) => (   
              <TableRow key={label}>
                <TableCell 
                  sx={{
                    whiteSpace: 'nowrap',
                  }}
                >
                  {label}
                </TableCell>
                <TableCell>
                  {normalizedRecord[cocoasKey as keyof typeof normalizedRecord] as string}
                </TableCell>
                <TableCell>
                  {andpadRecord[andpadKey]}
                </TableCell>
              </TableRow>)))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};