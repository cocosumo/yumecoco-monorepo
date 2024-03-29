import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { ArrayHelpers, FieldArray, useFormikContext } from 'formik';
import { EmptyBox } from 'kokoas-client/src/components/ui/information/EmptyBox';
import { useContractsByCustGroupId } from 'kokoas-client/src/hooksQuery';
import { TypeOfForm } from '../form';
import { BillingEntryTableRow } from './BillingEntryTableRow';
import { BillingEntryTableHead } from './BillingEntryTableHead';
import { ExceedContractAmount } from './ExceedContractAmount';
import { v4 as uuidV4 } from 'uuid';
import { produce } from 'immer';


export const BillingEntryTable = ({
  totalAmountExceeded,
  isBilled,
}: {
  totalAmountExceeded: boolean
  isBilled: boolean
}) => {

  const { values, setValues } = useFormikContext<TypeOfForm>();
  const { custGroupId, estimates } = values;

  const { data: contracts } = useContractsByCustGroupId(custGroupId);

  const filterTable = estimates.filter((estimate) => estimate.isShow);



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
                {({ insert }: ArrayHelpers) => (
                  <>
                    {
                      estimates.map((row, idx) => {
                        if (!row.isShow) return;
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
                                estimateIndex: uuidV4(),
                              };
                              insert(idx + 1, newRow);
                            }}
                            handleRemove={() => {
                              // 履歴として残せるよう、remove(idx)ではなくisShowで調整する
                              setValues((prev) => produce(prev, (draft) => {
                                draft.estimates[idx].isShow = false;
                              }));
                            }}
                            key={`${row.estimateIndex}`}
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
