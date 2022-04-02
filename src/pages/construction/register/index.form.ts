import * as Yup from 'yup';

export type BuildingTypeVals =
| '戸建て'
| 'マンション'
| '店舗/事務所'
| 'その他';


/**
 * Set Initial values here in case MUI is shouting about un/controlled components.
 */
export const initialValues = {
  custGroupId: '',
  buildingType: '戸建て' as BuildingTypeVals,
  isChkAddressKari: false,
};

/**
 * Set Validation for fields that requires it.
 * Refer to YUM documentation.
 */
export const validationSchema =  Yup.object({
  custGroupId: Yup
    .string()
    .required('必須です。'),
});
