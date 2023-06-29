import { Chip, Stack, Tooltip } from '@mui/material';
import { EnvelopeRecipients } from 'docusign-esign';
import { useMemo } from 'react';
import { IContracts } from 'types';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import parseISO from 'date-fns/parseISO';
import format from 'date-fns/format';
import jaLocale from 'date-fns/locale/ja';


export const ContractRecipients = ({
  hasContract,
  rawRecipients,
}:{
  hasContract: boolean,
  rawRecipients: IContracts['envRecipients']
}) => {

  

  const parsedEnvRecipients = useMemo(
    () => {
      const {
        carbonCopies = [],
        signers = [],
      } : EnvelopeRecipients = JSON.parse(rawRecipients?.value || '{}' ) || {};

      return [...signers, ...carbonCopies];

    }, [rawRecipients],
  );  


  return (
    <Stack  
      direction={'row'} 
      spacing={0} 
      divider={<ArrowRightIcon sx={{ color: 'GrayText' }} />}
    >
      {!parsedEnvRecipients?.length && !hasContract && (
      <Tooltip title="まだ開始していません。開始するには、編集画面にてプレビューボタンを押してください。">
        <Chip
          label={'未処理'}
          size={'small'}
          color={'default'}
        />
      </Tooltip>
      )}

      {!parsedEnvRecipients?.length && hasContract && (
        <Tooltip title="開始しましたが、まだ誰もサインしていません。">
          <Chip
            label={'送信済'}
            size={'small'}
            color={'info'}
          />
        </Tooltip>
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
  );
};