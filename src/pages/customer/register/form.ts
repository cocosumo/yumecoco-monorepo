import * as Yup from 'yup';



export type KeyOfConstructionDetails = keyof ConstructionDetails.SavedData;
export type ConstructionDetailsValues = Partial<Record<KeyOfConstructionDetails, string | number | boolean>>;

/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues: ConstructionDetailsValues = {
  constructionTypeId: '',
  constructionName: '',
  agent1Id: '',
  agent2Id: '',
  isAgentConfirmed: false,
  postal: '',
  address1: '',
  address2: '',
  addressKari: '',
};

/**
 * Set Validation for fields that requires it.
 * Refer to YUM documentation.
 */
export const validationSchema =  Yup.object(
  {
    custGroupId: Yup
      .string()
      .required('必須です。'),
    postal: Yup
      .string()
      .required('必須です。'),
  } as Partial<Record<KeyOfConstructionDetails, any>>,
);
