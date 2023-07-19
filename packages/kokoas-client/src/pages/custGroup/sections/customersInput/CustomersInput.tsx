
import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Stack } from '@mui/material';
import { SyntheticEvent, useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTypedFormContext } from '../../hooks/useTypedHooks';
import { useFieldArray } from 'react-hook-form';
import { AddButton } from './AddButton';
import { DeleteButton } from './DeleteButton';
import { Summary } from './Summary';
import { CustomerInputDetails } from './CustomerInputDetails';
import { initCustomerValue } from '../../form';

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
    <Stack 
      spacing={2}
      alignItems={'flex-start'}
    >
      <Box
        width={'100%'}
      >
        {customers.map((
          cust,
          index,
        ) => {

          const {
            id,
          } = cust;

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
                  <Summary 
                    index={index}
                  />

                  {index !== 0 && (
                  <DeleteButton 
                    onClick={() => remove(index)}
                  />
                  )}
              
                </Stack>

              </AccordionSummary>
              <AccordionDetails>
                <CustomerInputDetails 
                  index={index}
                />
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
        onClick={() => {
          append({ 
            ...initCustomerValue, 
            isSameAddress: true,
          });
        }}
      />
      )}


    </Stack>
    
  );
};