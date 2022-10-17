import {  Chip, Stack, Tooltip, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

export const ContractStatus = () => {

  const {
    values: {
      envRecipients,
      envelopeStatus,
      signMethod,
    },
  } = useFormikContext<TypeOfForm>();

  let jaSignMethod = '電子契約';
  if (signMethod === 'wetInk') {
    jaSignMethod = '紙印刷';
  }

  const isWithContract = envelopeStatus !== '';
  return (
    <Stack direction={'row'} spacing={0} divider={<ArrowRightIcon sx={{ color: 'GrayText' }} />}>
      {isWithContract &&  (
      <Typography color={'GrayText'}>
        {`${jaSignMethod} `}
      </Typography>)}

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