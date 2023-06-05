import {  Alert, Chip, Stack, Tooltip } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { useWatch } from 'react-hook-form';
import { TypeOfForm } from '../schema';
import { useContractById } from 'kokoas-client/src/hooksQuery';
import { TEnvelopeStatus, TSignMethod } from 'types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import jaLocale from 'date-fns/locale/ja';
import { EnvelopeRecipients } from 'docusign-esign';
import { grey } from '@mui/material/colors';
import { Info } from '../parts/Info';
import { useMemo } from 'react';

export const ContractStatus = () => {

  const contractId = useWatch<TypeOfForm>({
    name: 'contractId',
  });

  const { data: contractData } = useContractById(contractId as string);

  const {
    envRecipients,
    signMethod,
    envelopeStatus,
    envelopeId,
  } = contractData || {};

  const {
    carbonCopies = [],
    signers = [],
  } : EnvelopeRecipients = JSON.parse(envRecipients?.value || '{}' ) || {};

  const parsedEnvRecipients = [...signers, ...carbonCopies];

  const parsedSignMethod = useMemo(() => {
    const sM = signMethod?.value as TSignMethod;
    if (!sM) return;
    if (sM === 'electronic') return '電子契約';
    if (sM === 'wetInk') return '紙印刷';
  }, [signMethod?.value]); 

  const data = [
    { label: '契約ID', value: contractId as string || '-' },
    { label: 'Docusign ID', value: envelopeId?.value || '-' },
    { label: '署名手法', value: parsedSignMethod || '-' },
  ];

  const hasContract = !!envelopeStatus?.value;
  
  return (
    <Stack
      p={2}
      border={1}
      borderColor={grey[300]}
      bgcolor='white'
      spacing={2}
    >
      <Stack 
        direction={'row'} 
        spacing={0} 
        divider={<ArrowRightIcon sx={{ color: 'GrayText' }} />}
      >
        {!parsedEnvRecipients.length && (envelopeStatus?.value as TEnvelopeStatus) === 'sent' && (
        <Alert severity='info'>
          {(signMethod?.value as TSignMethod) === 'electronic'
            ? 'まだ誰もサインしていません。'
            : '担当者がサインした契約書をまだアップロードしていません。' }
        </Alert>
        )}

        {!hasContract  && (
          <Alert severity='info'>
            {contractId ? '未処理' : '新規' }
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
                        {format(parseISO(deliveredDateTime), 'PPpp', { locale: jaLocale })}
                      </div>
                      )}
                      {signedDateTime && (
                      <div>
                        承認日時：
                        {format(parseISO(signedDateTime), 'PPpp', { locale: jaLocale })}
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
      {contractId  && data.map(({ label, value }) => (
        <Info
          key={label}
          label={label}
          value={value}
        />
      ))}

    </Stack>
    
  );
};