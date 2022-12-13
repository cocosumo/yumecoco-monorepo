import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormikLabeledCheckBox } from 'kokoas-client/src/components';
import { useInvoiceTotalByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { roundTo } from 'libs';
import { getEstimatesFieldName, TypeOfForm } from '../form';
import { estimatesSplit } from '../helper/estimatesSplit';
import { EstimateTableHead } from './EstimateTableHead';

export const EstimatesTable = () => {
  const { values } = useFormikContext<TypeOfForm>();
  const {
    custGroupId,
    estimates,
  } = values;

  const { data: invoices } = useInvoiceTotalByCustGroupId(custGroupId || '');
  const sortContracts = estimatesSplit(estimates);


  return (
    <>
      {sortContracts?.map((arr, projIdx) => {
        return (
          <div key={`estimateTbl_${arr[0].projId}_container`}>
            <TableContainer component={Paper}>
              <Table size="small">
                <EstimateTableHead projTypeName={arr[0].projTypeName} />
                <TableBody>
                  {arr.map((row, rowIdx) => {
                    return (
                      <TableRow key={`tableRow_${row.projId}_${row.dataId}`}>
                        <TableCell>
                          {/* dummy */}
                        </TableCell>
                        <TableCell align="right">
                          {/* 枝番号 */
                            row.dataId.split('-')[2]
                          }
                        </TableCell>
                        <TableCell align="right">
                          {/* 契約金額 */
                            roundTo(+row.amountPerContract).toLocaleString()
                          }
                        </TableCell>
                        <TableCell align="right">
                          {/* 請求済み金額 */
                            invoices?.totalInvoice.reduce((acc, cur) => {
                              if (row.dataId !== cur.dataId) return acc;
                              return acc + +cur.billedAmount;
                            }, 0)
                              .toLocaleString()
                          }
                        </TableCell>
                        <TableCell>
                          {/* 請求に使用する */}
                          <FormikLabeledCheckBox
                            name={getEstimatesFieldName(projIdx + rowIdx, 'isForPayment')}
                          />
                        </TableCell>
                      </TableRow>
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