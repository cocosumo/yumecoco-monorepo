import { Stack } from '@mui/material';
import { NewButton } from '../../common/NewButton';
import { ActionButton } from '../../common/ActionButton';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';

export const Actions = ({
  projId,
}:{
  projId: string,
}) => {
  return (
    <Stack
      direction={'row'}
      spacing={2}
      justifyContent={'flex-end'}
    >
      <ActionButton disabled>
        見積から引用
      </ActionButton>
      <NewButton 
        href={`${pages.projOrderInput}?${generateParams({ projId })}`}        
        title='発注を登録する'
      >
        発注登録
      </NewButton>
      
    </Stack>
  );
};