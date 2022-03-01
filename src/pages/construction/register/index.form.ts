import * as Yup from 'yup';

export const initialValues = {
  custGroupId: '',
};

export const validationSchema =  Yup.object({
  custGroupId: Yup
    .string()
    .required('必須です。'),
});
