import { InputAdornment, Tooltip } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { ProjTypeHelpContent } from './ProjTypeHelpContent';

export const ProjTypeHelp = () => {

  return (
    <Tooltip title={<ProjTypeHelpContent />}>
      <InputAdornment position='start'>
        <HelpIcon />
      </InputAdornment>
    </Tooltip>
  );
};