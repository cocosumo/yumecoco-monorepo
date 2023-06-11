import { Stack } from '@mui/material';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { Detail, DetailSectionTitle, DetailsContainer } from '../common';

export const GeneralDetails = ({
  storeName,
  cocoAgs,
  yumeAgs,
}:{
  storeName: string,
  cocoAgs: string,
  yumeAgs: string,
}) => {

  const generalDetails: IDetail[] = [
    {
      label: '店舗名',
      value: storeName,
    },
    {
      label: 'ここすも営業',
      value: cocoAgs,
    },
    {
      label: 'ゆめてつAG',
      value: yumeAgs,
    },
  ];

  return (
    <Stack spacing={1}>
      <DetailSectionTitle>
        担当情報
      </DetailSectionTitle>
      <DetailsContainer>
        <Stack spacing={2} width={'50%'}>
          {generalDetails.map(({
            label,
            value,
          }) => (
            <Detail 
              key={label} 
              label={label} 
              value={value}
            />
          ))}

        </Stack>
   

      </DetailsContainer>
    </Stack>
  );
};