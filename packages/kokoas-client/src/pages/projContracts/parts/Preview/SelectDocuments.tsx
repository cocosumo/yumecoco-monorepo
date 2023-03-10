import {  Chip, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { TypeOfForm } from '../../form';
import AttachmentIcon from '@mui/icons-material/Attachment';


export const SelectDocuments = ({
  handlePreview,
  selectedDoc,
}: {
  handlePreview: (fileKey: string) => void,
  selectedDoc: string,
}) => {

  const {
    values: {
      envDocFileKeys,
    } } = useFormikContext<TypeOfForm>();


  return (
    <Stack p={0} spacing={1} direction={'row'}
      alignItems={'center'}
    >
      {envDocFileKeys.map(file => {
        const isSelected = selectedDoc === file.fileKey;

        return (
          <Chip
            variant={isSelected ? 'outlined' : 'filled'}
            icon={isSelected ? <AttachmentIcon /> : undefined}
            key={file.fileKey}
            label={file.name}
            size={isSelected ? 'medium' : 'small'}
            onClick={()=>{
              handlePreview(file.fileKey);
            }}
          />
        );
      })}
    </Stack>
  );
};