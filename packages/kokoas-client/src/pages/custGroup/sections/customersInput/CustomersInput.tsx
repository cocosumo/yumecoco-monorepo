
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Stack, Typography } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { useFieldArray } from 'react-hook-form';
import { AddButton } from './AddButton';
import { initialCustomerValue } from 'kokoas-client/src/pages/customer/register/form';
import { DeleteButton } from './DeleteButton';

export const CustomersInput = () => {
  const { control } = useTypedFormContext();

  const {
    fields: customers,
    append,
    remove,
  } = useFieldArray({
    control,
    name: 'customers',
  });

  const [expanded, setExpanded] = useState<string | false>(customers.length ? customers[0].id : false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const custLength = customers.length;
  const isMaxCust  = custLength >= 3;


  return (
    <Stack spacing={2}>
      <Box>
        {customers.map((
          {
            id,
          },
          index,
        ) => {

          return (
            <Accordion 
              key={id}
              expanded={expanded === id} onChange={handleChange(id)}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
              >
                <Stack
                  direction={'row'}
                  justifyContent={'space-between'}
                  width={'100%'}
                >
                  <Typography sx={{ width: '33%' }}>
                    General settings
                  </Typography>
                  <Typography sx={{ color: 'text.secondary' }}>
                    I am an accordion
                  </Typography>

                  {index !== 0 && (
                  <DeleteButton 
                    onClick={() => remove(index)}
                  />
                  )}
              
                </Stack>

              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
                  Aliquam eget maximus est, id dignissim quam.
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      


      </Box>

      {isMaxCust && (
        <Alert>
          顧客は最大3件まで登録できます。
        </Alert>
      )}

      {!isMaxCust && (
      <AddButton 
        onClick={() => append(initialCustomerValue)}
      />
      )}


    </Stack>
    
  );
};