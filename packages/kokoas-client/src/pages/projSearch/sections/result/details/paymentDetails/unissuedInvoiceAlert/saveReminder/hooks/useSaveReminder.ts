import { useSaveUnissuedInvoiceAlert } from 'kokoas-client/src/hooksQuery';
import { IContracts, IEmployees, IProjects } from 'types';
import { convertToKintone } from '../convertToKintone';


export const useSaveReminder = ({
  recProj,
  recContracts,
  recEmployees,
}:{
  recProj: IProjects,
  recContracts: IContracts[],
  recEmployees: IEmployees[],
}) => {

  const { mutateAsync } = useSaveUnissuedInvoiceAlert();

  // kintoneレコード型にデータを編集
  const record = convertToKintone({
    recProj,
    recContracts,
    recEmployees,
  });

  // kintoneにレコード登録
  return async () => (
    mutateAsync({
      record: record,
    })
  );
};
