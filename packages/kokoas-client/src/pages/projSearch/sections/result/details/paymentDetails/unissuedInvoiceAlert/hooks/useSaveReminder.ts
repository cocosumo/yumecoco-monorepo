import { useContractsByProjIdV2, useEmployees, useProjById, useSaveUnissuedInvoiceAlert } from 'kokoas-client/src/hooksQuery';
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

  // kintoneにレコード登録
  return async () => {
    if (!recProj || !recContracts || !recEmployees) return;

    const record = convertToKintone({
      recProj: recProj,
      recContracts: recContracts,
      recEmployees: recEmployees,
      purpose,
    });

    mutateAsync({
      record: record,
    });
  };
};
