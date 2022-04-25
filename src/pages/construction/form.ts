import * as Yup from 'yup';
import { postalRegExp } from '../../helpers/yupValidator';


export type BuildingTypeVals =
| '戸建て'
| 'マンション'
| '店舗/事務所'
| 'その他';


/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  custGroupId: undefined  as undefined | string,
  constructionTypeId: '',
  constructionName: '',
  isAgentConfirmed: false,
  //agentsId: [] as string[],
  cocoConst1: '',
  cocoConst2: '',
  postal: '',
  address1: '',
  address2: '',
  addressKari: '',
  buildingType: '戸建て' as BuildingTypeVals,
  isChkAddressKari: false,
};

export type ConstructionDetailsType = typeof initialValues;
export type KeyOfConstructionDetails = keyof ConstructionDetailsType;
export type ConstructionDetailsValues = Partial<Record<KeyOfConstructionDetails, string | number | boolean>>;


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
      .matches(postalRegExp, '半角数字。例：4418124')
      .required('必須です。'),
  } as Partial<Record<KeyOfConstructionDetails, any>>,
);
