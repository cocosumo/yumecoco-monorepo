import { Button, Card, CardActions, CardContent, Grid, Stack } from '@mui/material';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { PageSubTitle } from '../../../../../components/ui/labels';
import { LabeledDetail } from '../../../../../components/ui/typographies/LabeledDetail';
import { jaEnvelopeStatus } from '../../../../../lib/jaEnvStatus';
import { pages } from '../../../../Router';
import { CustomerForm } from '../../form';

export const RelatedProjects = () => {
  const { values: { projects } } = useFormikContext<CustomerForm>();
  const navigate = useNavigate();


  return (
    <>
      <Grid item xs={12}>
        <PageSubTitle label='関連プロジェクト' />
      </Grid>
      {
      projects.map(({ projName, projId, envelopeStatus })=>{

        return (
          <Grid item xs={12} md={6} lg={4} key={projName}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <LabeledDetail label='工事番号' value={projId} direction={'column'} />
                  <LabeledDetail label='工事名' value={projName} direction={'column'} />
                  <LabeledDetail label='契約状態' value={jaEnvelopeStatus(envelopeStatus).ja} direction={'column'} />
                </Stack>
              </CardContent>
              <CardActions>
                <Button
                  variant={'outlined'} size={'small'}
                  onClick={()=>navigate(`${pages.projEdit}?projId=${projId}`)}
                >
                  工事情報
                </Button>
                <Button
                  variant={'outlined'} size={'small'}
                  onClick={()=>navigate(`${pages.projContractPreview}?projId=${projId}`)}
                >
                  契約
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );

      })
    }


    </>

  );
};