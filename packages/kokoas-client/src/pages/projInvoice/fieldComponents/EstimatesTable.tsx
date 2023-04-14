import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { EstimateTableBody } from './EstimatesTableBody';
import { EstimateTableHead } from './EstimateTableHead';
import { useContractsByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { splitEstimatesByProjId } from '../helper/splitEstimatesByProjId';
import { convertContructsToForm } from '../api/convertContructsToForm';

export const EstimatesTable = ({
  custGroupId,
  isBilled,
}: {
  custGroupId: string
  isBilled: boolean
}) => {

  /* const { values } = useFormikContext<TypeOfForm>();
  const {
    estimates,
  } = values; */
  const { data: contracts } = useContractsByCustGroupId(custGroupId);


  const newContracts = convertContructsToForm();

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