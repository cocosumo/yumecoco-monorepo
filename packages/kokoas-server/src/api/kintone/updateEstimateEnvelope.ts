import { uploadFilesToKintone } from 'api-kintone/src/@file';
import { IProjestimates, IRecipient, ReqSendContract, TConnectEventType } from 'types';
import { getEstimateByEnvId, saveEstimate } from 'api-kintone';
import { updateContractEnvelope } from 'kokoas-server/src/handleRequest/reqSendContractDirectV2/updateContractEnvelope';

/**
 * 
 * @param param0 
 * @returns 
 * @deprecated 契約はもう見積もりに依存しないので、この関数は使わなくなる
 */
export const updateEstimateEnvelope = async ( params : {
  custGroupId?: string,
  projEstimateId?: string,
  signMethod?: ReqSendContract['signMethod'],
  envelopeId: string,
  documents: {
    data :string,
    name: string,
  }[],
  envelopeStatus: string,
  event: TConnectEventType,
  recipients: IRecipient[]
}) => {
  const {
    envelopeId,
    documents,
    envelopeStatus,
    event,
    recipients,
    projEstimateId,
    signMethod,
  } = params;

  try {
    // routine under [try] will be deprecated.
    // docusign's webhook must call updateContractEnvelope directly when 
    // the feature is ready. ras 2023-05-02
    let recordId = projEstimateId;

    // Search the id by envelope id,
    if (!recordId) {
      const {
        uuid,
      } = await getEstimateByEnvId(envelopeId);
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
    const record : Partial<IProjestimates> = {
      envId: {
        value: envelopeId,
      },
      envStatus: {
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

    const result = await saveEstimate({
      recordId,
      record,
    });
    return result;

    
  } catch (err) {
    console.error('updateEstimateEnvelope Failed', err);
    // re-route webhook request to new contract
    await updateContractEnvelope(params);

  }
  
};
