import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { useFormikContext } from 'formik';
import { useInvoiceTotalByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../form';
import { estimatesSplit } from '../helper/estimatesSplit';
import { EstimateTableBody } from './EstimatesTableBody';
import { EstimateTableHead } from './EstimateTableHead';

export const EstimatesTable = () => {
  const { values } = useFormikContext<TypeOfForm>();
  const {
    custGroupId,
    estimates,
  } = values;

  const { data: invoices } = useInvoiceTotalByCustGroupId(custGroupId || '');
  const sortContracts = estimatesSplit(estimates);
  let idx = -1;

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
                    idx += 1;
                    return (
                      <EstimateTableBody
                        estimateRow={row}
                        idx={idx}
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