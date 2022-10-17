import {  Chip, Stack, Tooltip } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const ContractStatus = () => {

  const {
    values: {
      envRecipients,
    },
  } = useFormikContext<TypeOfForm>();

  return (
    <Stack direction={'row'} spacing={0} divider={<ArrowRightIcon sx={{ color: 'GrayText' }} />}>


      {envRecipients && (
        envRecipients
          .map(({
            roleName,
            recipientIdGuid,
            status,
            name,
          }) => {
            return (
              <Tooltip
                key={recipientIdGuid}
                placement="top"
                title={name}
              >
                <Chip
                  label={roleName}
                  size={'small'}
                  color={status === 'completed' ? 'success' : 'default'}
                />
              </Tooltip>
            );
          })
      )}

    </Stack>
  );
};