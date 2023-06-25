import { IconButton } from '@mui/material';
import { EmployeePicker } from '../../dialogs/employeePicker/EmployeePicker';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';


export const OpenPicker = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton 
        type="button" 
        sx={{ p: '10px' }} 
        aria-label="search"
        onClick={() => setOpen(true)}
      >
        <SearchIcon />
      </IconButton>
      <EmployeePicker
        open={open}
        onClose={() => setOpen(false)}
      />
    </>
  );
};