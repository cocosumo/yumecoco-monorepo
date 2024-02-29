import { useContractsByProjIdV2, useEmployees, useProjById, useSaveUnissuedInvoiceAlert } from 'kokoas-client/src/hooksQuery';
import { IContracts, IEmployees, IProjects } from 'types';
import { convertToKintone } from '../saveReminder/convertToKintone';
import { KAlertPurpose } from '../alertConfig';


export const useSaveReminder = ({
  projId,
  purpose,
}: {
  projId: string
  purpose: KAlertPurpose
}) => {

  const { data: recProj } = useProjById(projId);
  const { data: recContracts } = useContractsByProjIdV2(projId);
  const { data: recEmployees } = useEmployees();
  const { mutateAsync } = useSaveUnissuedInvoiceAlert();

  // kintoneレコード型にデータを編集
  const record = convertToKintone({
    recProj: recProj || {} as IProjects,
    recContracts: recContracts || [] as IContracts[],
    recEmployees: recEmployees || [] as IEmployees[],
    purpose,
  });

  // kintoneにレコード登録
  return async () => (
    mutateAsync({
      record: record,
    })
  );
};
