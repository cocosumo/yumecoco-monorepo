import { FormControl, InputLabel, ListSubheader, ListSubheaderProps, MenuItem, Select } from '@mui/material';
import { Option } from 'types';
import { useCocoEmpGrpByRole } from '../../../hooks/useCocoEmpGrpByRole';
import { Fragment } from 'react';

const label = 'ここすも担当者';

// ここで順番を変えると、表示される順番が変わる
const roles = ['店長', '主任', '営業', '工務', '経理', 'サポート'];

function MyListSubheader(props: ListSubheaderProps) {
  return <ListSubheader {...props} />;
}

function MenuItems({
  options,
}: {
  options: Option[]
}) {
  return (<>
    {options.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ))}
  </>);
}


export const CocoOfficer = () => {
  const { data } = useCocoEmpGrpByRole();


  return (
    <FormControl fullWidth size='small'>
      <InputLabel id="cocoAg">
        {label}
      </InputLabel>


      <Select
        labelId="cocoAg"
          //value={age}
        label={label}
      >
        {roles.map((role) => (
          <Fragment key={role}>
            <MyListSubheader>
              {role}
            </MyListSubheader>
            <MenuItems options={data?.[role] ?? []} />
          </Fragment>
        ))}
      </Select>
    </FormControl>
  );
};