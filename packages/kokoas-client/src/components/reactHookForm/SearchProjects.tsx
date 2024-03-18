import { Autocomplete, Stack, TextField } from '@mui/material';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useSearchProjects } from 'kokoas-client/src/hooksQuery';
import { pages } from 'kokoas-client/src/pages/Router';
import { useEffect, useState } from 'react';
import { Control, Controller, UseControllerProps, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDebounceValue } from 'usehooks-ts';
import { Caption } from '../ui';


type Opt = {
  id: string,
  projName: string
};

interface BaseFields {
  projName: string;
  projId: string;
}

type FormProps<T extends BaseFields> = {
  controllerProps: UseControllerProps<T>;
  navigateTo?: string,
};


export function SearchProjects<T extends BaseFields>(
  { 
    controllerProps,
    navigateTo = pages.projEstimate,
  }: FormProps<T>,
) {

  const [inputVal, setInputVal] = useState('');
  const [options, setOptions] = useState<Array<Opt>>([]);
  const [value, setValue] = useState<Opt | null>();
  const [debouncedInput] = useDebounceValue(inputVal, 1000);
  const navigate = useNavigate();
  const {
    name,
    control,  
  } = controllerProps;

  const [
    projName,
    projId,
  ] = useWatch({
    name: ['projName', 'projId'],
    control: (control as never) as Control<BaseFields>,
  });


  const {
    data: recProjects = [],
  } = useSearchProjects(debouncedInput);

  useEffect(() => {

    if (recProjects?.length) {
      const newOptions = recProjects
        ?.map<Opt>((rec) => ({
        id: rec.uuid.value,
        projName: rec.projName.value,
      }));
      setOptions(newOptions);
    }
  }, [recProjects]);

  useEffect(() => {
    if (projId && projName) {
      setValue({
        id: projId,
        projName: projName,
      });
    }
  }, [projId, projName]);

  console.log('projId', projId, projName);

  return (
    <Controller 
      {...controllerProps}
      render={({ field }) => {
        
        return (
          <Autocomplete 
            {...field} 
            fullWidth
            sx={{
              maxWidth: 400,
            }}
            size='small'
            inputValue={inputVal}
            value={value || null} 
            options={options}
            getOptionLabel={(opt)=> opt.projName || ''}
            isOptionEqualToValue={(opt, v) => opt.id === v.id}
            filterOptions={(x) => x}
            onInputChange={(_, val) => {
              setInputVal(val);
            }}
            onChange={(_, opt) => {
              setValue(opt);
              navigate(`${navigateTo}?${generateParams({
                projId: (opt as Opt)?.id,
              })}`);
              
    
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label='工事情報の検索'
                name={name}
                fullWidth
                placeholder="山田　タロウ"
              />)}
            renderOption={(p, opt) => {
              const key = `listItem-${opt.id}`;
              return (
                <li {...p} key={key}>
                  <Stack>
                    {opt.projName}
                    <Caption text={`id: ${opt.id}`} />
                  </Stack>
                </li>
              );
            }}
          />
        );
      }}
    />
  );
}