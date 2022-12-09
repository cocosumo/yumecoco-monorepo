import {  Chip, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { getFieldName, TypeOfForm } from '../../form';
import AttachmentIcon from '@mui/icons-material/Attachment';


export const SelectDocuments = ({
  handlePreview,
}: {
  handlePreview: (fileKey: string) => void
}) => {

  const {
    values: {
      envDocFileKeys, envSelectedDoc,
    }, setFieldValue } = useFormikContext<TypeOfForm>();

  return (
    <Stack p={0} spacing={1} direction={'row'}
      alignItems={'center'}
    >
      {envDocFileKeys.map(file => {
        const isSelected = envSelectedDoc === file.fileKey;

        return (
          <Chip
            variant={isSelected ? 'outlined' : 'filled'}
            icon={isSelected ? <AttachmentIcon /> : undefined}
            key={file.fileKey}
            label={file.name}
            size={isSelected ? 'medium' : 'small'}
            onClick={()=>{
              setFieldValue(getFieldName('envSelectedDoc'), file.fileKey);
              handlePreview(file.fileKey);
            }}
          />
        );
      })}
    </Stack>
  );
};