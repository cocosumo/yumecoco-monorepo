import { Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import { useTypedWatch } from '../../hooks/useTypedRHF';
import { RecordCancelStatus, recordCancelStatuses } from 'types';
import { useUpdateCancelStatus } from '../../hooks/useUpdateCancelStatus';


export const CancelStatus = () => {
  const {
    updateCancelStatus,
  } = useUpdateCancelStatus();

  const cancelStatus = useTypedWatch({
    name: 'cancelStatus',
  }) as RecordCancelStatus[];


  return (
    <FormControl 
      component="fieldset"
    >
      <FormGroup
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
      >

        {recordCancelStatuses.map((item) => {

          return (
            <FormControlLabel
              key={item}
              control={
                <Checkbox
                  checked={cancelStatus?.includes(item) || false}
                  onChange={() => updateCancelStatus(item)}
                  name={item}
                  color="primary"
                />
            }
              label={item}
            />
          );
        })}

      </FormGroup>
    </FormControl>
                
  );

};