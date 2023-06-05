import { 
  FormControl, 
  InputLabel, 
  ListSubheader, 
  ListSubheaderProps, 
  MenuItem, 
  Select,
  Typography, 
} from '@mui/material';
import { Option, useCocoEmpGrpByRole } from '../../../hooks/useCocoEmpGrpByRole';
import { Fragment } from 'react';

const inputLabel = 'ここすも担当者';

function MyListSubheader(props: ListSubheaderProps) {
  return <ListSubheader {...props} />;
}

function MenuItems({
  options,
}: {
  options: Option[]
}) {
  return (<>
    {options.map(({
      label,
      value,
      isRetired,
    }) => (
      <MenuItem key={value} value={value}>
        {label}
        {isRetired && (
        <Typography ml={2} sx={{ color: 'text.secondary' }}>
          退職者
        </Typography>
        )}  

      </MenuItem>
    ))}
  </>);
}

export const CocoOfficer = ({
  includeRetired,
}: {
  includeRetired: boolean
}) => {
  const { data } = useCocoEmpGrpByRole(includeRetired);



  return (
    <FormControl fullWidth size='small'>
      <InputLabel id="cocoAg">
        {inputLabel}
      </InputLabel>


      <Select
        labelId="cocoAg"
        label={inputLabel}
      >
        
        <MyListSubheader >
          店長・主任
        </MyListSubheader>
        { data && (
          <MenuItems options={[
            ...(data['店長'] || []),
            ...(data['主任'] || []),
          ]}
          />
        )}

        <MyListSubheader >
          営業
        </MyListSubheader>
        { data && (
          <MenuItems options={data['営業'] || []} />
        )}

        
        <MyListSubheader >
          工務
        </MyListSubheader>
        { data && (
          <MenuItems options={data['工務'] || []} />
        )}


        <MyListSubheader >
          工務
        </MyListSubheader>
        { data && (
          <MenuItems options={data['工務'] || []} />
        )}

        
        <MyListSubheader >
          経理
        </MyListSubheader>
        { data && (
          <MenuItems options={data['経理'] || []} />
        )}

        <MyListSubheader >
          サポート
        </MyListSubheader>
        { data && (
          <MenuItems options={data['サポート'] || []} />
        )}
        
        
      </Select>
    </FormControl>
  );
};