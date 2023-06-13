import { Button, Stack, Typography, Zoom } from '@mui/material';

import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { useURLParams } from 'kokoas-client/src/hooks/useURLParams';
import { useNavigate } from 'react-router-dom';
import { pages } from 'kokoas-client/src/pages/Router';
import { generateParams } from 'kokoas-client/src/helpers/url';
import { kokoasAPIBaseUrl } from 'config';
import { kokoasEndpoints } from 'libs';

export const StepComplete = ({
  handleReset,
}: {
  handleReset: () => void
}) => {

  const {
    projId,
    projEstimateId,
  } = useURLParams();

  const navigate = useNavigate();

  const params = generateParams({
    projId,
    projEstimateId,
  });

  return (
    <Stack
      spacing={2}
      alignItems={'center'}
    >
      <Zoom
        in={true}
        style={{
          transitionDelay: '500ms',
          transitionDuration: '1000ms',
        }}
      >
        <TaskAltIcon
          sx={{
            width: 120,
            height: 120,
          }}
          color={'success'}
        />
      </Zoom>
      <Typography variant={'h4'}>
        登録しました
      </Typography>
      <Stack direction={'row'} spacing={4}>
        <Button onClick={handleReset}>
          原価明細アップロード
        </Button>
        <Button
          onClick={() => navigate(`${pages.projEdit}?${params}`)}
        >
          工事内容編集
        </Button>
        <Button
          onClick={() => navigate(`${pages.projEstimate}?${params}`)}
        >
          見積書編集
        </Button>
        <Button
          onClick={() => window.open(`${kokoasAPIBaseUrl}/${kokoasEndpoints.downloadEstimateAsAndpad}/${projEstimateId}`)}
        >
          Andpadの実行予算形式
        </Button>
        <Button
          onClick={() => window.open(`${kokoasAPIBaseUrl}/${kokoasEndpoints.downloadEstimateAsAndpadEst}/${projEstimateId}`)}
        >
          Andpadの見積形式
        </Button>

      </Stack>
    </Stack>
  );
};