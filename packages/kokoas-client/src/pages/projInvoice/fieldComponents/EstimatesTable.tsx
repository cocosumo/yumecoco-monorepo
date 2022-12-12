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

  console.log('invoices', invoices);


  return (
    <>
      {sortContracts?.map((arr, projIdx) => {
        return (
          <>
            <TableContainer component={Paper} key={`estimateTbl_${arr[0].projId}`}>
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
                            roundTo(+row.amountPerContract)
                          }
                        </TableCell>
                        <TableCell align="right">
                          {/* 請求済み金額 */
                            'メンテ中'
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
          </>
        );
      })}
    </>
  );
};