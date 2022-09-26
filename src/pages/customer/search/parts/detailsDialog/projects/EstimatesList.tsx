import { Card, CardContent } from '@mui/material';
import { useEstimateRecords } from '../../../../../../hooks';

export const EstimatesList = ({
  projId,
}: {
  projId: string
}) => {
  const { projEstimateRecords } = useEstimateRecords(projId);


  return (
    projEstimateRecords
      ?.map(({
        $id,
        envStatus,
        estimateStatus,
        signMethod,
        作成日時: dateCreated,
        内訳: materials,
      }) => {

      })
  );
};