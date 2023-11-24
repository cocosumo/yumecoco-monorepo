import useFileUpload from 'react-use-file-upload';
import { UploadContainer } from './UploadContainer';
import { NoAttachments } from './NoAttachments';

export const Attachments = () => {
  const fileUploadReturn = useFileUpload();


  return (
    <UploadContainer {...fileUploadReturn}>
      <NoAttachments />
    </UploadContainer>
  );
};