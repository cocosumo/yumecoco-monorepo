import {  Alert, Chip, Stack, Tooltip } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { useContractById } from 'kokoas-client/src/hooksQuery';
import { TEnvelopeStatus, TSignMethod } from 'types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import { ja } from 'date-fns/locale';
import { EnvelopeRecipients } from 'docusign-esign';
import { grey } from '@mui/material/colors';

export const ContractStatus = () => {

  const contractId = useWatch<TypeOfForm>({
    name: 'contractId',
  });

  const { data } = useContractById(contractId as string);

  const {
    envRecipients,
    signMethod,
    envelopeStatus,
  } = data || {};

  const {
    carbonCopies = [],
    signers = [],
  } : EnvelopeRecipients = JSON.parse(envRecipients?.value || '{}' ) || {};

  const parsedEnvRecipients = [...signers, ...carbonCopies];

  return (
    <Stack 
      p={2}
      border={1}
      borderColor={grey[300]}
      bgcolor='white'
      direction={'row'} 
      spacing={0} 
      divider={<ArrowRightIcon sx={{ color: 'GrayText' }} />}
    >
      {!envRecipients && (envelopeStatus?.value as TEnvelopeStatus) === 'sent' && (
        <Alert severity='info'>
          {(signMethod?.value as TSignMethod) === 'electronic'
            ? 'まだ誰もサインしていません。'
            : '担当者がサインした契約書をまだアップロードしていません。' }
        </Alert>
      )}

      {parsedEnvRecipients?.length && (
        parsedEnvRecipients
          ?.map(({
            roleName,
            recipientIdGuid,
            status,
            name,
            email,
            signedDateTime,
            deliveredDateTime,
          }) => {
            return (
              <Tooltip
                key={recipientIdGuid}
                placement="top"
                title={(
                  <Stack spacing={1}>
                    <div>
                      {`${name} <${email}>`}
                    </div>
                    {deliveredDateTime && (
                    <div>
                      受信日時：
                      {format(parseISO(deliveredDateTime), 'PPpp', { locale: ja })}
                    </div>
                    )}
                    {signedDateTime && (
                      <div>
                        承認日時：
                        {format(parseISO(signedDateTime), 'PPpp', { locale: ja })}
                      </div>  
                    )}
                  </Stack>
                )}
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