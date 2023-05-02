import { EnvelopesApi, EnvelopeSummary } from 'docusign-esign';
import { getContractDataV2 } from 'kokoas-server/src/api/kintone/getContractDataV2';
import {  ReqSendContractParams } from 'types';
import { apiClient } from '../../../../config';
import { updateEstimateEnvelope } from '../../../kintone/updateEstimateEnvelope';
import { getAccountId } from '../../authentication';
import { makeEnvelopeV2 } from './makeEnvelopeV2';

export const processContract = async (
  params: ReqSendContractParams,
  status: 'created' | 'sent' = 'sent',
) => {
  const {
    signMethod,
  } = params;
  try {
    console.log('SIGN METHOD', signMethod);
    const accountId = await getAccountId();

    const data = await getContractDataV2(params, true);

    const envelopesApi = new EnvelopesApi(apiClient);

    const envelope = await makeEnvelopeV2({
      data,
      status,
      signMethod,
    });

    let envSummary: EnvelopeSummary = Object.create(null);
    const envDocFileKeys: string[] = [];

    if (data.envelopeId) throw new Error(`エンヴェロープはもう存在しています。リロードして解決出来なかったら、お手数ですが、管理者にご連絡ください。 ${data.envelopeId}`);

    console.log('Creating envelope.');
    envSummary = await envelopesApi.createEnvelope(
      accountId,
      {
        envelopeDefinition: envelope,
      },
    );

    console.log('Envelope created.');

    if (envSummary.envelopeId && envelope.documents?.length) {
      console.log(`Updating contractId: ${data.contractId}`);
      const { envelopeId, status: newStatus } = envSummary;

      /*       await updateEstimateEnvelope({
        envelopeId: envelopeId,
        envelopeStatus: newStatus ?? 'sent',
        event: 'envelope-sent',
        signMethod: signMethod,
        documents: envelope.documents?.map(({ documentBase64, name }) => {
          return {
            data: documentBase64 || '',
            name: (name || '') + '.pdf',
          };
        }),
        recipients: [],
        projEstimateId: data.projEstimateId,
      });

      console.log(`Done updating midumori. ${data.projEstimateId}`);
      envDocFileKeys = envelope
        .documents?.map((d) => d.documentBase64 ?? '') ?? []; */
    }


    return {
      envelopeSummary: envSummary,
      documents: envDocFileKeys,
      accountId,
    };
  } catch (err: any) {
    throw new Error(err.message);
  }
};
