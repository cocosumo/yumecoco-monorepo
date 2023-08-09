import { EnvelopesApi, EnvelopeSummary } from 'docusign-esign';
import { getContractDataV2 } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/getContractDataV2';
import {  ReqSendContractParams } from 'types';
import { apiClient } from '../../config';
import { getAccountId } from '../../api/docusign/authentication';
import { makeEnvelopeV2 } from './makeEnvelopeV2';
import { updateContractEnvelope } from './updateContractEnvelope';

export const processContractV2 = async (
  params: ReqSendContractParams,
  status: 'created' | 'sent' = 'sent',
) => {
  const {
    signMethod,
  } = params;
  try {
    console.log('SIGN METHOD', signMethod, params);
    const accountId = await getAccountId();

    const data = await getContractDataV2(params, true);

    const envelopesApi = new EnvelopesApi(apiClient);

    const envelope = await makeEnvelopeV2({
      data,
      status,
    });

    let envSummary: EnvelopeSummary = Object.create(null);
    let envDocFileKeys: string[] = [];

    if (data.envelopeId) throw new Error(`エンヴェロープはもう存在しています。リロードして解決出来なかったら、お手数です。 ${data.envelopeId}`);

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

      await updateContractEnvelope({
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
        contractId: data.contractId,
      });

      console.log(`Done updating contract. ${data.contractId}`);

      envDocFileKeys = envelope
        .documents?.map((d) => d.documentBase64 ?? '') ?? [];
    }


    return {
      envelopeSummary: envSummary,
      documents: envDocFileKeys,
      accountId,
    };
  } catch (err) {
    throw new Error(err.message);
  }
};
