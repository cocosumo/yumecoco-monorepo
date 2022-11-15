import { Card, CardContent, Chip, CircularProgress, FormHelperText, Stack, Typography } from '@mui/material';
import isEmpty from 'lodash/isEmpty';
import { FormikLabeledCheckBox } from '../../../components/ui/checkboxes';
import { useEstimatesByProjId } from '../../../hooksQuery/useEstimatesByProjId';
import { getEstimatesFieldName } from '../form';

const FormLabel = ({
  label,
  value,
}: {
  label: string,
  value: string,
}) => {


  return (
    <Stack direction={'row'} spacing={2}>
      <Typography variant='caption'>
        {label}
      </Typography>
      <Typography>
        {value}
      </Typography>
    </Stack>
  );
};

export const EstimateCards = ({
  projId,
}: {
  projId: string
}) => {

  const {
    data,
    error,
    isFetching,
  } = useEstimatesByProjId(projId);

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

          if (!record.envStatus.value) return; // 未契約の情報は表示しない

          return (
            <Card key={`${projId}_${record.$id.value}`}>
              <CardContent>
                <Stack spacing={1} direction={'row'}>
                  {!!record.estimateStatus.value &&
                    <Chip
                      size='small'
                      color="primary"
                      label={record.estimateStatus.value}
                    />}
                  <Chip
                    size='small'
                    color="success"
                    label='契約'
                  />
                </Stack>
                <FormLabel
                  label='見積もり番号'
                  value={record.$id.value}
                />
                <FormLabel
                  label='契約金額'
                  value={Math.round(calculated[idx].totalAmountInclTax).toLocaleString() + '円'}
                />
                <FormLabel
                  label='契約日'
                  value={record.contractDate.value}
                />
                <FormikLabeledCheckBox
                  label='請求に使用しない'
                  name={getEstimatesFieldName(idx, 'isForPayment')}
                />
              </CardContent>
            </Card>
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