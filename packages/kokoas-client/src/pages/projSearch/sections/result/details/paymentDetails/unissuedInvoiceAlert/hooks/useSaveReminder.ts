import { useSaveUnissuedInvoiceAlert } from 'kokoas-client/src/hooksQuery';
import { IContracts, IEmployees, IProjects } from 'types';
import { convertToKintone } from '../saveReminder/convertToKintone';
import { KAlertPurpose } from '../alertConfig';


export const useSaveReminder = ({
  recProj,
  recContracts,
  recEmployees,
  purpose,
}:{
  recProj: IProjects
  recContracts: IContracts[]
  recEmployees: IEmployees[]
  purpose: KAlertPurpose
}) => {

  const { mutateAsync } = useSaveUnissuedInvoiceAlert();

  // kintoneレコード型にデータを編集
  const record = convertToKintone({
    recProj,
    recContracts,
    recEmployees,
    purpose,
  });

  // kintoneにレコード登録
  return async () => (
    mutateAsync({
      record: record,
    })
  );
};
