import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { EstimateTableBody } from './EstimatesTableBody';
import { EstimateTableHead } from './EstimateTableHead';
import { useContractsByCustGroupId, useInvoicesById, useInvoicesSummaryByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { splitEstimatesByProjId } from '../helper/splitEstimatesByProjId';
import { convertContructsToForm } from '../api/convertContructsToForm';

export const EstimatesTable = ({
  invoiceId,
  custGroupId,
  isBilled,
}: {
  invoiceId: string
  custGroupId: string
  isBilled: boolean
}) => {

  /* const { values } = useFormikContext<TypeOfForm>();
  const {
    estimates,
  } = values; */

  const { data: datContracts } = useContractsByCustGroupId(custGroupId);
  const { data: datInvoice } = useInvoicesById(invoiceId);
  const { data: datInvoicesSummary } = useInvoicesSummaryByCustGroupId(custGroupId);
  const {
    records: recContracts,
    calculated,
  } = datContracts || {};
  const {
    record: recInvoice,
  } = datInvoice || {};

  const newContracts = convertContructsToForm({
    recContracts,
    calculated,
    recInvoice,
    datInvoicesSummary,
  });

  const sortContracts = splitEstimatesByProjId(newContracts);



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