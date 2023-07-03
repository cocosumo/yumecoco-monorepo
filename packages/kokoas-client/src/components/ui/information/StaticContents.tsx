import {  LinearProgress } from '@mui/material';

import { ReactNode } from 'react';
import { StaticContentContainer } from './StaticContentContainer';
import { StaticContentActions } from './StaticContentActions';
import { StaticContentInfos } from './StaticContentInfos';

export const StaticContents = ({
  data,
  isLoading,
  children,
  actions,
}: {
  data: Array<{
    label: string,
    value: ReactNode,
  }>
  isLoading?: boolean,
  children?: ReactNode
  actions?: ReactNode
}) => {
  
  return (
    <StaticContentContainer>
      {isLoading && ( <LinearProgress  /> )}
      {!isLoading && (
        <>
          <StaticContentInfos 
            data={data}
          />
          {children}

          <StaticContentActions>
            {actions}
          </StaticContentActions>

        </>
      )}

    </StaticContentContainer>
  );
};