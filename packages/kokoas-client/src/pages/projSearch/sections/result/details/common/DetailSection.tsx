import { ReactNode } from 'react';
import { DetailSectionTitle } from './DetailSectionTitle';
import { DetailsContainer } from './DetailsContainer';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { Detail } from './Detail';

export const DetailSection = ({
  title,
  details,
}:{
  title: ReactNode,
  details: IDetail[]
}) => {
  return (
    <>
      <DetailSectionTitle>
        {title}
      </DetailSectionTitle>
      <DetailsContainer>
        {details.map((detail) => {
          return (
            <Detail 
              key={detail?.key || detail?.label}
              {...detail}
            />
          ); 
        })}
      </DetailsContainer>
    
    </>
  );
};