import { Chip, CircularProgress, Stack, Tooltip } from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { EnvelopeRecipients } from 'docusign-esign';
import { useContractById } from 'kokoas-client/src/hooksQuery';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { TEnvelopeStatus, TSignMethod } from 'types';
import format from 'date-fns/format';
import parseISO from 'date-fns/parseISO';
import jaLocale from 'date-fns/locale/ja';
import { Info } from '../../parts/Info';
import InfoIcon from '@mui/icons-material/Info';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';


export const ContractFlow = () => {
  const contractId = useTypedWatch({
    name: 'contractId',
  }) as string;

  const { data: contractData, isInitialLoading } = useContractById(contractId || '');
  
  const {
    envRecipients,
    signMethod,
    envelopeStatus,
  } = contractData || {};

  const {
    carbonCopies = [],
    signers = [],
  } : EnvelopeRecipients = JSON.parse(envRecipients?.value || '{}' ) || {};

  const parsedEnvRecipients = [...signers, ...carbonCopies];

  const hasContract = !!envelopeStatus?.value;

  return (
    <Info 
      label='ステータス'
      value={(
        <Stack 
          direction={'row'} 
          spacing={0} 
          divider={<ArrowRightIcon sx={{ color: 'GrayText' }} />}
        >
          {isInitialLoading && (
          <CircularProgress size={20} />
          )}

          {
            !isInitialLoading && !parsedEnvRecipients.length &&  (envelopeStatus?.value as TEnvelopeStatus) === 'sent' && (
              <Chip
                label={(signMethod?.value as TSignMethod) === 'electronic'
                  ? 'まだ誰もサインしていません'
                  : '担当者がサインした契約書をまだアップロードしていません'}
                size={'small'}
                color={'secondary'}
                icon={<InfoIcon />}
              />
            )
          }

          {!isInitialLoading && !hasContract && !contractId && (
          <Chip
            label={'新規'}
            size={'small'}
            color={'info'}
            icon={<FiberNewIcon />}
          />
          )}

          
          {!isInitialLoading && !hasContract && !!contractId && (
          <Chip
            label={'未処理'}
            size={'small'}
            color={'warning'}
            icon={<PauseCircleIcon />}
          />
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

      )}
    />

  );
};