import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { useFormikContext } from 'formik';
import { useInvoiceTotalByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../form';
import { splitEstimatesByProjId } from '../helper/splitEstimatesByProjId';
import { EstimateTableBody } from './EstimatesTableBody';
import { EstimateTableHead } from './EstimateTableHead';

export const EstimatesTable = () => {
  const { values } = useFormikContext<TypeOfForm>();
  const {
    custGroupId,
    estimates,
  } = values;

  const { data: invoices } = useInvoiceTotalByCustGroupId(custGroupId || '');
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