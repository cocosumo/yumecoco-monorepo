import { Box } from '@mui/material';
import { EmptyBox } from '../../../../components/ui/information/EmptyBox';

export const ErrorNoProjSelected = ({
  handleSearchTTOpen,
  handleSearchTTClose,
}: {
  isWithProjId: boolean,
  handleSearchTTOpen: () => void,
  handleSearchTTClose: () => void
},
) => {
  return (

    <Box sx={{ position: 'relative', top: 0 }}>
      <EmptyBox
        onMouseEnter={handleSearchTTOpen}
        onMouseLeave={handleSearchTTClose}
      >
        工事名で検索してください
      </EmptyBox>
    </Box>

  );
};