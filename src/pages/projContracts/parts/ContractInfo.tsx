import { Button, Divider, Grid, Grow } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { OutlinedDiv } from '../../../components/ui/containers';
import { LabeledInfo } from '../../../components/ui/typographies';
import { generateParams, getParams } from '../../../helpers/url';
import { pages } from '../../Router';
import { TypeOfForm } from '../form';

export const ContractInfo = () => {
  const { values: {
    projId,
    projEstimateId,
    projName,
    custName, custAddress, store,
    cocoAg, yumeAg, constAg,
    projAddress,
  } } = useFormikContext<TypeOfForm>();


  useEffect(() => {
    if (projEstimateId) {

    }

  }, [projEstimateId]);


  return (
    <Grow in={!!projId} mountOnEnter unmountOnExit>
      <Grid item xs={12} >
        <OutlinedDiv label='契約内容'>

          <Grid container spacing={2} p={2}>

            <Grid item xs={12}>
              <LabeledInfo label={'店舗'} data={store} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'顧客名'} data={custName} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'現住所'} data={custAddress} />
            </Grid>
            <Grid item xs={12} md={6}>
              <LabeledInfo label={'ここすも営業担当者'} data={cocoAg} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'ゆめてつAG'} data={yumeAg} />
            </Grid>

            <Grid container item xs={12} >
              <Button size={'small'} color="inherit" variant="contained" >顧客編集</Button>
            </Grid>

            <Grid item xs={12} >
              <Divider/>
            </Grid>

            <Grid item xs={12}>
              <LabeledInfo label={'工事名'} data={constAg} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'工事担当者'} data={projName} />
            </Grid>

            <Grid item xs={12} md={6}>
              <LabeledInfo label={'工事住所'} data={projAddress} />
            </Grid>

            <Grid container item xs={12} >
              <Link to={`${pages.projEdit}?${generateParams({
                ...getParams(),
                projId,
                projEstimateId,
              })}`}>
                <Button
                  size={'small'} color="secondary"
                  variant="contained" >
                  工事情報編集
                </Button>
              </Link>

            </Grid>

          </Grid>
        </OutlinedDiv>
      </Grid>
    </Grow>
  );
};