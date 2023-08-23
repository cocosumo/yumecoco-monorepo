import { sendEmail } from '../../api/sendEmail';

export const onSubmitSuccessHandler = async (event: {
  record: DB.SavedRecord
}) => {
  const {
    record,
  } = event;

  console.log(event, record);

  await sendEmail(event);

  return event;
};