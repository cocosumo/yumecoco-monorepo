import { CustomEmailField } from './CustomEmailField';

export const EmailToField = () => {
  return (        
    <CustomEmailField label="宛先" required name={'emailTo'} />
  );
};