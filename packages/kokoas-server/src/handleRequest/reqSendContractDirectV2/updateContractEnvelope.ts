import { uploadFilesToKintone } from 'api-kintone/src/@file';
import { IContracts, IRecipient, ReqSendContractParams, TConnectEventType } from 'types';
import { saveContract } from 'api-kintone';
import { getContractByEnvId } from 'api-kintone/src/contracts/getContractByEnvId';

export const updateContractEnvelope = async ({
  envelopeId,
  documents,
  envelopeStatus,
  event,
  recipients,
  contractId,
  signMethod,
} : {
  custGroupId?: string,
  contractId?: string,
  signMethod?: ReqSendContractParams['signMethod'],
  envelopeId: string,
  documents: {
    data :string,
    name: string,
  }[],
  envelopeStatus: string,
  event: TConnectEventType,
  recipients: IRecipient[]
}) => {
  let recordId = contractId; // uuid of contract record

  // Search the id by envelope id,
  if (!recordId) {
    const {
      uuid,
    } = await getContractByEnvId(envelopeId);
    recordId = uuid.value;
  }

  console.log('Found enveloped at uuid, ', recordId);

  // Upload the file
  let fileKeys: string[] = [];

  switch (event) {
    case 'envelope-sent': // Sent to at least one recipient
    case 'recipient-completed': // A recipient signed
    case 'envelope-completed': // All recipients signed
      if (documents.length) {
        fileKeys = await uploadFilesToKintone(documents);
      }
  }

  // Generate updated record and attach the file
  const record : Partial<IContracts> = {
    envelopeId: {
      value: envelopeId,
    },
    envelopeStatus: {
      value: envelopeStatus,
    },
    envRecipients: {
      value: JSON.stringify(recipients),
    },

    ...(
      event === 'envelope-completed' ?
        {
          envCompleteDate: { value : new Date().toISOString() },
        } : {}
    ),

    // Conditionally update attached file if a new file is uploaded
    ...(
      fileKeys.length ?
        { envDocFileKeys: {
          type: 'FILE',
          value: fileKeys.map((fk) => {
            return {
              fileKey: fk,
              contentType: 'pdf',
              name: '',
              size: '',
            };
          }),
        } } : {}
    ),

  };

  if (signMethod) {
    record.signMethod = { value: signMethod };
  }

  if (!recordId) throw new Error('updateEstimateEnvelope Failed due to missing recordId.');

  const result = await saveContract({
    recordId,
    record,
  }); 
  return result;
};
