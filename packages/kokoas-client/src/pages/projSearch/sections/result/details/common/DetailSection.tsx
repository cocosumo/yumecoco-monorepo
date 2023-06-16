import { ReactNode } from 'react';
import { DetailSectionTitle } from './DetailSectionTitle';
import { DetailsContainer } from './DetailsContainer';
import { IDetail } from 'kokoas-client/src/pages/projSearch/types';
import { Detail } from './Detail';

export const DetailSection = ({
  title,
  details,
  isSubtle,
}:{
  title: ReactNode,
  details: IDetail[]
  isSubtle?: boolean,
}) => {
  return (
    <>
      <DetailSectionTitle>
        {title}
      </DetailSectionTitle>
      <DetailsContainer isSubtle={isSubtle}>
        {details.map((detail) => {
          return (
            <Detail 
              isSubtle={isSubtle}
              key={detail?.key || detail?.label}
              {...detail}
            />
          ); 
        })}
      </DetailsContainer>
    
    </>
  );
};