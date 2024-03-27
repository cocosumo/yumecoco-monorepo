import { useContractsByProjIdV2, useEmployees, useProjById, useSaveUnissuedInvoiceAlert } from 'kokoas-client/src/hooksQuery';
import { convertToKintone } from '../saveReminder/convertToKintone';
import { KAlertPurpose } from '../alertConfig';


export const useSaveReminder = ({
  projId,
  purpose,
  paymentDate,
  paymentAmount,
}: {
  projId: string
  purpose: KAlertPurpose
  paymentDate: Date | null
  paymentAmount: string
}) => {

  const {
    data: recProj,
    isLoading: isLoadingProj,
  } = useProjById(projId);
  const {
    data: recContracts,
    isLoading: isLoadingContracts,
  } = useContractsByProjIdV2(projId);
  const {
    data: recEmployees,
    isLoading: isLoadingEmployees,
  } = useEmployees();
  const { mutateAsync } = useSaveUnissuedInvoiceAlert();

  const isLoading = isLoadingProj || isLoadingContracts || isLoadingEmployees;

  // kintoneにレコード登録
  const saveReminder = async () => {
    if (!recProj || !recContracts || !recEmployees) return;

    const record = convertToKintone({
      recProj: recProj,
      recContracts: recContracts,
      recEmployees: recEmployees,
      purpose,
      paymentDate,
      paymentAmount,
    });

    return mutateAsync({
      record: record,
    });
  };

  return {
    saveReminder,
    isLoadingSaveReminder: isLoading,
  };
};
