import { Button, Card, CardActions, CardContent, Grid, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import { useNavigate } from 'react-router-dom';
import { PageSubTitle } from '../../../../../components/ui/labels';
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
      projects.map(({ projName, projId })=>{

        return (
          <Grid item xs={12} md={6} lg={4} key={projName}>
            <Card>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  工事番号
                </Typography>
                <Typography variant="h6" component="div" gutterBottom>
                  {projId}
                </Typography>

                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                  工事名
                </Typography>
                <Typography variant="h6" component="div">
                  {projName}
                </Typography>


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