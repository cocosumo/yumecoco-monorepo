import { Button, Stack } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';

export const FormActions = () => {
  return (
    <Stack
      direction="row"
      spacing={2}
      pt={2}
    >
      <Button
        variant="outlined"
        size="large"
        startIcon={<SaveIcon />}
        onClick={() => {}}
        //disabled={isSaveDisabled}
      >
        保存
      </Button>

      <Button
        variant="outlined"
        size="large"
        startIcon={<PreviewIcon />}
        //onClick={handleOpenPreview}
        //disabled={isPreviewDisabled}
      >
        プレビュー
      </Button>
    </Stack>
  );
};