import * as Yup from 'yup';

export type BuildingTypeVals =
| '戸建て'
| 'マンション'
| '店舗/事務所'
| 'その他';

export type KeyOfConstructionDetails = keyof typeof initialValues;
export type ConstructionDetailsValues = Partial<Record<KeyOfConstructionDetails, string | number | boolean>>;

/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  id: '',
  constructionTypeId: '',
  constructionName: '',
  isAgentConfirmed: false,
  cocoConst1: '',
  cocoConst2: '',
  postal: '',
  address1: '',
  address2: '',
  addressKari: '',
  custGroupId: '',
  buildingType: '戸建て' as BuildingTypeVals,
  isChkAddressKari: false,
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
