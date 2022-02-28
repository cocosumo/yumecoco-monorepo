import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';



interface SearchFieldProps {
  //dataSource : ()=>any,
  label: string
  field?: string,
  returnField?: string
}

const SearchField = (props : SearchFieldProps) => {
  const {
    label,
  } = props;
  return (
    <TextField
      fullWidth
      label={label}
      helperText={'※顧客情報登録を先にしてください。'}
      InputProps={{
        endAdornment: <InputAdornment position="end"><SearchIcon/></InputAdornment>,
      }}
    />
  );
};

export default SearchField;