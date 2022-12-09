import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useFormikContext } from 'formik';
import { FormikLabeledCheckBox } from 'kokoas-client/src/components';
import { useContractsByCustGroupId, useInvoicesByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { getEstimatesFieldName, TypeOfForm } from '../form';
import { estimatesSplit } from '../helper/estimatesSplit';
import { EstimateTableHead } from './EstimateTableHead';

export const EstimatesTable = () => {
  const { values } = useFormikContext<TypeOfForm>();
  const {
    custGroupId,
    estimates,
  } = values;

  const { data: contracts } = useContractsByCustGroupId(custGroupId || '');
  const { data: invoices } = useInvoicesByCustGroupId(custGroupId || '');
  const sortContracts = estimatesSplit(estimates);



  return (
    <>
      {sortContracts.map((arr, projIdx) => {
        return (
          <TableContainer component={Paper} key={arr[0].projId}>
            <Table>
              <TableHead>
                <EstimateTableHead projTypeName={arr[0].projTypeName} />
              </TableHead>
              <TableBody>
                {arr.map((row, rowIdx) => {
                  return (
                    <TableRow key={row.dataId}>
                      <TableCell>
                        {/* dummy */}
                      </TableCell>
                      <TableCell>
                        {/* 枝番号 */
                        
                          row.dataId.split('-')[2]
                        }
                      </TableCell>
                      <TableCell>
                        {/* 契約金額 */
                          row.amountPerContract
                        }
                      </TableCell>
                      <TableCell>
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
        );
      })}
      <br />
    </>
  );
};