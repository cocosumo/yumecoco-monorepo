import { Chip, FormControl, FormLabel, Stack, Typography } from '@mui/material';
import { format } from 'date-fns';
import { LabeledInfo } from 'kokoas-client/src/components';
import { useFormContext, useWatch } from 'react-hook-form';
import { TypeOfForm } from '../form';




export const EstimatesInfo = () => {

  const { control } = useFormContext<TypeOfForm>();
  const [
    estimateId,
    createdDate,
    estimateDataId,
    envStatus,
    projId,
  ] = useWatch({
    control,
    name: ['estimateId', 'createdDate', 'estimateDataId', 'envStatus', 'projId'],
  });

  if (!projId) {
    return (null);
  }

  return (
    <FormControl>
      <FormLabel>
        編集中の見積り情報
      </FormLabel>

      {!estimateId &&
        <Typography variant="body1">
          新規作成
        </Typography>}

      {estimateId &&

        <Stack direction={'row'} spacing={1}>
          <LabeledInfo
            label={'ID'}
            info={estimateDataId}
            fontSize={14}
            direction={'row'}
          />
          {!!createdDate && (
          <LabeledInfo
            label={'作成日'}
            fontSize={14}
            info={format(createdDate, 'yyyy/MM/dd')}
            direction={'row'}
          />
          )}

        </Stack>}
      {!!envStatus &&
        <Stack direction={'row'} spacing={1}>
          <Chip
            size='small'
            color='success'
            label='契約'
          />
          <Typography borderBottom={1} color={'error'}>
            契約済のため編集不可
          </Typography>
        </Stack>}
    </FormControl>
  );
};