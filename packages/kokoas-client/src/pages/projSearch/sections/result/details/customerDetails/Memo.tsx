import { DetailsContainer, Detail } from '../common';

export const Memo = ({
  memo,
}: {
  memo: string,
}) => {
  return (
    <DetailsContainer>
      <Detail 
        label='備考'
        value={memo}
      />

    </DetailsContainer>
  );

      
};