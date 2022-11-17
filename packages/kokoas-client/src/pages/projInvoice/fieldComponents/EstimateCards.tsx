import { CircularProgress, FormHelperText, Stack, Typography } from '@mui/material';
import { useContractsByProjId } from 'kokoas-client/src/hooksQuery';
import isEmpty from 'lodash/isEmpty';
import { getEstimatesFieldName } from '../form';
import { EstimateCard } from './EstimateCard';

/**
 * 契約済みの見積もりカードを表示する処理
 * @param projId 工事番号 
 * @returns 
 */
export const EstimateCards = ({
  projId,
}: {
  projId: string
}) => {

  const {
    data,
    error,
    isFetching,
  } = useContractsByProjId(projId);

  const {
    calculated,
    records,
  } = data || {};

  const found = Boolean(records?.find(record => !isEmpty(record.envStatus.value)));

  return (
    <>
      <Typography variant='caption'>
        契約一覧
      </Typography>
      {isFetching && <CircularProgress />}
      {!isFetching && <Stack direction={'row'} spacing={2}>
        {!!records && !!calculated && records.map((record, idx) => {
          return (
            <EstimateCard
              name={getEstimatesFieldName(idx, 'isForPayment')}
              projId={projId}
              record={record}
              totalAmountInclTax={calculated[idx].totalAmountInclTax}
              key={`${record.$id.value}`}
            />
          );
        })}
      </Stack>}
      {!isFetching && !found && records && <Typography>
        契約済みの見積もりがありません
      </Typography>}
      {!isFetching && !records && !calculated && !projId && <Typography>
        工事が選択されていません
      </Typography>}
      {!!error && (
        <FormHelperText error={true}>
          {`エラーが発生しました。${error}`}
        </FormHelperText>
      )}
    </>
  );
};