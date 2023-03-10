import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../form';
import { splitEstimatesByProjId } from '../helper/splitEstimatesByProjId';
import { EstimateTableBody } from './EstimatesTableBody';
import { EstimateTableHead } from './EstimateTableHead';

export const EstimatesTable = ({
  isBilled,
}:{
  isBilled: boolean
}) => {
  const { values } = useFormikContext<TypeOfForm>();
  const {
    estimates,
  } = values;

  const sortContracts = splitEstimatesByProjId(estimates);


  return (
    <>
      {sortContracts?.map((arr) => {
        return (
          <div key={`estimateTbl_${arr[0].projId}_container`}>
            <TableContainer component={Paper}>
              <Table size="small">
                <EstimateTableHead projTypeName={arr[0].projTypeName} />
                <TableBody>
                  {arr.map((row) => {
                    return (
                      <EstimateTableBody
                        estimateRow={row}
                        isBilled={isBilled}
                        key={`tableRow_${row.projId}_${row.dataId}`}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <br />
          </div>
        );
      })}
    </>
  );
};