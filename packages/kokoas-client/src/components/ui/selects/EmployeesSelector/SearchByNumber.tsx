import { InputBase, Tooltip } from '@mui/material';
import { useAllEmployees } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';

export const SearchByNumber = ({
  empSortNumber,
  onChange,
  onBlur,
}:{
  empSortNumber: string,
  onChange: (empId: string | undefined) => void,
  onBlur?: () => void,
}) => {
  const [value, setValue] = useState(empSortNumber);
  const { data } = useAllEmployees();

  useEffect(() => {
    if (!empSortNumber) return;
    setValue(empSortNumber);
  }, [empSortNumber]);

  
  return (
    <Tooltip title="ソート順で検索">
      <InputBase
        value={value}
        disabled={!data}
        sx={{ flex: 0.3, ml: 1 }}
        placeholder="番号"
        type='number'
        onBlur={onBlur}
        onChange={(e) => {
          const sortNumber = e.target.value;

          const foundRecord = sortNumber
            ? data?.find(({ sort }) => sort.value === sortNumber) : undefined;
    
          onChange(foundRecord?.uuid.value);
          setValue(sortNumber);
        }}
      />
    </Tooltip>
  );
};