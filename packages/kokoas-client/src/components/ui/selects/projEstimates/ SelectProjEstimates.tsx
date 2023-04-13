import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';
import { pages } from 'kokoas-client/src/pages/Router';
import { ComponentProps } from 'react';
import { useNavigate } from 'react-router-dom';
import { ItemEstimate } from './ItemEstimate';

export const SelectProjEstimates = (props:  ComponentProps<typeof Select> & {
  projId?: string
}) => {
  const navigate = useNavigate();

  /* Set defaults here */
  const {
    projId,
    value = '', 
    variant = 'outlined',
    label = '見積選択',
    onChange = (e) => {
      const selected = e.target.value as string;
      navigate(`?${generateParams({ projId, projEstimateId: selected })}`);
    },
    ...othersProps
  } = props;

  const { data: recProjEstimates } = useEstimatesByProjId(projId);
  const {
    records,
    calculated,
  } = recProjEstimates || {};
  
  return (
    <FormControl fullWidth>
      <InputLabel>
        {label}
      </InputLabel>
      <Select
        {...othersProps}
        fullWidth
        variant={variant}
        label={label}
        value={value}
        onChange={onChange}
      >
        <MenuItem value={''}>
          ----
        </MenuItem>
        {
         !!calculated?.length && records?.map((rec, idx) => {
           const { uuid } = rec;
           return (
             <MenuItem key={uuid.value} value={uuid.value}>
               <ItemEstimate 
                 estimateRecord={rec}
                 calculated={calculated[idx]}
               />
             </MenuItem>
           );
         })
        }
        <MenuItem 
          onClick={() => navigate(`${pages.projEstimate}?${generateParams({ projId })}`)}
        >
          見積作成
        </MenuItem>

      </Select>

    </FormControl>
  );
};