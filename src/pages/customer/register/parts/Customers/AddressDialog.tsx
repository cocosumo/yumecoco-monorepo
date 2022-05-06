import { DialogTitle, Dialog, DialogContent, Button, Grid, Divider, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { getPrefectures, getCities, getTowns, GetTownsResponseLocation, GetCitiesRespLocation } from '../../../../../api/others/address';
import { usePrefectureArea } from '../../../../../hooks/usePrefectureArea';

interface AddressDetails {
  area: string,
  prefecture: string,
  city: string,
  town: string,
  postal: string,
}

export const Choices = (props: {
  name: keyof AddressDetails,
  choices: string[]
  handleClick : (name: keyof AddressDetails, value: string, postal?: string) => void
}) => {

  const { choices, handleClick, name } = props;
  return (
    <>
      {
      choices?.map(
        item => (
          <Grid key={item} item xs={'auto'}>
            <Button
              key={item}
              variant={'outlined'}
              onClick={()=>{
                handleClick(name, item);
              }}
            >{item}</Button>
          </Grid>
        ),
      )
    }
    </>
  );
};



const initialAddressDetailsState = {
  area: '',
  prefecture: '',
  city: '',
  town: '',
  postal: '',
};

const alphabeticalReducer = (accu: any, curr: any, groupKey: string)=>{
  let firstChar = curr[groupKey].charAt(0);
  if (firstChar === '(') firstChar = curr[groupKey]; // そのた
  return { ...accu, [firstChar]: [...accu?.[firstChar] ?? [], curr] };
};


export const AddressDialog = (props: {
  open: boolean,
  handleClose: ()=>void
}) => {
  const { areas } = usePrefectureArea();
  const [prefectures, setPrefectures] = useState<string[]>([]);
  const [cities, setCities] = useState<GetCitiesRespLocation>([]);
  const [towns, setTowns] = useState<GetTownsResponseLocation>([]);
  const [addressDetails, setAddressDetails] = useState<AddressDetails>(initialAddressDetailsState);


  const { open, handleClose } = props;

  const handleClick = (name: keyof AddressDetails, value: string) => {
    setAddressDetails(prev => ({ ...prev, [name]: value }));
  };

  useEffect(()=>{
    if (!addressDetails.area) return;
    getPrefectures(addressDetails.area).then(resp => setPrefectures(resp));
  }, [addressDetails.area]);

  useEffect(()=>{
    if (!addressDetails.prefecture) return;
    getCities({ prefecture: addressDetails.prefecture })
      .then(resp => setCities(resp));
  }, [addressDetails.prefecture]);

  useEffect(()=>{
    if (!addressDetails.city) return;
    getTowns({ city: addressDetails.city })
      .then(resp => setTowns(resp));
  }, [addressDetails.city]);

  useEffect(()=>{
    if (addressDetails.postal){
      console.log(addressDetails.postal);
    }

  }, [addressDetails.postal]);

  useEffect(()=>{
    if (open){
      setAddressDetails(initialAddressDetailsState);
    }
  }, [open]);


  const groupedTowns :  { [key : string]: GetTownsResponseLocation } = towns
    .reduce((accu, curr) => alphabeticalReducer(accu, curr, 'town_kana'), {} );

  const groupedCities : { [key : string]: GetCitiesRespLocation } = cities
    .reduce((accu, curr) => alphabeticalReducer(accu, curr, 'city_kana'), {} );

  return (
    <Dialog

      open={open}
      onClose={handleClose}
      fullWidth
      maxWidth={'xs'}

    >
      <DialogTitle>
        選択してください。
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {!addressDetails.area &&
            <Choices name='area' choices={areas} handleClick={handleClick} />
          }

          {addressDetails.area && !addressDetails.prefecture &&
            <Choices name='prefecture' choices={prefectures} handleClick={handleClick} />
          }

          {addressDetails.prefecture && !addressDetails.city &&
            Object.entries(groupedCities)
              .sort(([a], [b])=>{
                return a.includes('そのた') ? 0 : a.localeCompare(b);
              })
              .map(([groupKey, values]) => {
                return (
                  <Grid key={groupKey} container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <Divider textAlign='left'>{groupKey} </Divider>
                    </Grid>
                    {
                      values.map(({ city_kana, city }) => {

                        return (
                          <Grid key={city_kana} item xs={'auto'}>
                            <Button
                              variant={'outlined'}
                              onClick={() =>
                                setAddressDetails(prev => (
                                  { ...prev, city }
                                ))
                              }
                            >
                              <Stack>
                                {city}

                              </Stack>
                            </Button>
                          </Grid>
                        );
                      })
                    }

                  </Grid>
                );
              })
          }

          { addressDetails.city && !addressDetails.town &&
            Object.entries(groupedTowns)
              .sort(([a], [b])=>{
                return a.includes('そのた') ? 0 : a.localeCompare(b);
              })
              .map(([groupKey, values]) => {
                return (
                  <Grid key={groupKey} container item xs={12} spacing={2}>
                    <Grid item xs={12}>
                      <Divider textAlign='left'>{groupKey} </Divider>
                    </Grid>
                    {
                      values.map(({ town_kana, postal, town }) => {

                        return (
                          <Grid key={town_kana} item xs={'auto'}>
                            <Button
                              variant={'outlined'}
                              onClick={() =>
                                setAddressDetails(prev => (
                                  { ...prev,
                                    town,
                                    postal,
                                  }
                                ))
                              }
                            >
                              <Stack>
                                {town}
                                <Typography variant="caption">
                                  〒 {postal.slice(0, 3) + '-' + postal.slice(3)}
                                </Typography>
                              </Stack>
                            </Button>
                          </Grid>
                        );
                      })
                    }
                  </Grid>

                );
              })
          }

        </Grid>
      </DialogContent>
    </Dialog>
  );
};