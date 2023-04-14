import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
import { EmptyBox } from 'kokoas-client/src/components/ui/information/EmptyBox';
import { useContractsByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../form';
import { BillingEntryTableRow } from './BillingEntryTableRow';
import { BillingEntryTableHead } from './BillingEntryTableHead';
import { ExceedContractAmount } from './ExceedContractAmount';


export const BillingEntryTable = ({
  totalAmountExceeded,
  isBilled,
}: {
  totalAmountExceeded: boolean
  isBilled: boolean
}) => {

  const { values } = useFormikContext<TypeOfForm>();
  const { custGroupId, estimates } = values;

  const { data: contracts } = useContractsByCustGroupId(custGroupId);

  const filterTable = estimates.filter((estimate) => estimate.isForPayment);



  return (
    <>
      {!filterTable.length &&
        <EmptyBox>
          請求に使用する契約を選択してください
        </EmptyBox>}
      {!!filterTable.length &&
        <TableContainer component={Paper}>
          <Table size="small">
            <BillingEntryTableHead />
            <TableBody>
              <FieldArray name="estimates" >
                {({ insert, remove }) => (
                  <>
                    {
                      estimates.map((row, idx) => {
                        if (!row.isForPayment) return;
                        const keyIdx = () => {
                          const sameContractNum = estimates
                            .filter(({ estimateIndex }) => estimateIndex === row.estimateIndex);

                          if (sameContractNum.length === 1) return 0;
                          
                        };

                        return (
                          <BillingEntryTableRow
                            estimate={row}
                            idx={idx}
                            paymentList={contracts?.paymentList}
                            isBilled={isBilled}
                            handleInsert={() => {
                              const newRow = {
                                ...estimates[idx],
                                billingAmount: 0,
                                amountType: '',
                              };
                              console.log('newRow', newRow);
                              insert(idx + 1, newRow);
                            }}
                            handleRemove={() => {
                              remove(idx);
                            }}
                            key={`${row.dataId}_row_${row.billingAmount}`}
                          />
                        );
                      })
                    }
                  </>
                )}
              </FieldArray>
            </TableBody>
          </Table>
        </TableContainer>}
      {totalAmountExceeded && <ExceedContractAmount isBilled={isBilled} />}
    </>
  );
};