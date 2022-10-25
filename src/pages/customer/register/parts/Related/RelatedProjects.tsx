import { Button, Card, CardActions, Grid } from '@mui/material';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { PageSubTitle } from '../../../../../components/ui/labels';
import { pages } from '../../../../Router';
import { CustomerForm } from '../../form';
import { RelatedProjectsContent } from './RelatedProjectsContent';

export const RelatedProjects = () => {
  const { values: { projects } } = useFormikContext<CustomerForm>();
  const navigate = useNavigate();


  return (
    <>
      <Grid item xs={12}>
        <PageSubTitle label='関連プロジェクト' />
      </Grid>
      {
      projects.map(({ projName, projId })=>{

        return (
          <Grid item xs={12} md={6}
            lg={4} key={projName}
          >
            <Card>
              <RelatedProjectsContent projId={projId} projName={projName} />
              <CardActions>
                <Button
                  variant={'outlined'} size={'small'}
                  onClick={()=>navigate(`${pages.projEdit}?projId=${projId}`)}
                >
                  工事情報
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