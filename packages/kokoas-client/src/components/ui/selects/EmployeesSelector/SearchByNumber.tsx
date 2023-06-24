import { InputBase, Tooltip } from '@mui/material';
import { useAllEmployees } from 'kokoas-client/src/hooksQuery';
import { useEffect, useState } from 'react';
import { IEmployees } from 'types';
import { useDebounce } from 'usehooks-ts';

export const SearchByNumber = ({
  empSortNumber,
  onChange,
}:{
  empSortNumber: string,
  onChange: (empRecord: IEmployees | undefined) => void,
}) => {
  const [value, setValue] = useState(empSortNumber);
  const { data } = useAllEmployees();


  const debouncedValue = useDebounce(value, 500);

  useEffect(() => {
    if (!debouncedValue) return;
    const foundRecord = data?.find(({ sort }) => sort.value === debouncedValue);

    onChange(foundRecord);
  }, [debouncedValue, data, onChange]);

  useEffect(() => {
    setValue(empSortNumber);
  }, [empSortNumber]);
  
  return (
    <Tooltip title="ソート順で検索">
      <InputBase
        value={value}
        sx={{ flex: 0.3, ml: 1 }}
        placeholder="番号"
        type='number'
        onChange={(e) => setValue(e.target.value)}
      />
    </Tooltip>
  );
};