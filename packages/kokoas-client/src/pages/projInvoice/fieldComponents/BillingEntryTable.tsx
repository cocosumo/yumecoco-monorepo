import { Paper, Table, TableBody, TableContainer } from '@mui/material';
import { FieldArray, useFormikContext } from 'formik';
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
  const { custGroupId, contracts } = values;

  const { data: recContracts } = useContractsByCustGroupId(custGroupId);

  const filterTable = contracts.filter((contract) => contract.isShow);



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
              <FieldArray name="contracts" >
                {({ insert }) => (
                  <>
                    {
                      contracts.map((row, idx) => {
                        if (!row.isShow) return;
                        return (
                          <BillingEntryTableRow
                            estimate={row}
                            idx={idx}
                            paymentList={recContracts?.paymentList}
                            isBilled={isBilled}
                            handleInsert={() => {
                              const newRow = {
                                ...contracts[idx],
                                billingAmount: 0,
                                amountType: '',
                                estimateIndex: uuidV4(),
                              };
                              insert(idx + 1, newRow);
                            }}
                            handleRemove={() => {
                              // 履歴として残せるよう、remove(idx)ではなくisShowで調整する
                              setValues((prev) => produce(prev, (draft) => {
                                draft.contracts[idx].isShow = false;
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
