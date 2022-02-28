
import { Checkbox, Grid, TextField, FormControlLabel, FormControl, FormHelperText } from '@mui/material';
import PageSubTitle from '../../../../../components/ui/labels/PageSubTitle';
import BasicSelect from '../../../../../components/ui/selects/BasicSelect';
import ConstructionAgent from './ConstructionAgent';

const ConstructionInfo = () => {
  const tempOptions: Options = ['新築工事', 'リフォーム工事', '新築付帯工事', '太陽工事', '蓄電池', '造成・外構工事', '解体・撤去工事', '営繕工事', '設備交換工事', '物品販売', 'その他工事', '自社工事', 'アフターメンテ']
    .map(item=> ({ label: item, value: '' }));

  return (
    <>
      <PageSubTitle label='工事情報' />
      <Grid container item xs={12} md={6} spacing={2}>
        <Grid item xs={12} md={8} >
          <BasicSelect name='constnType' label='工事種別' options={tempOptions} />
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth label="工事名称" placeholder='氏名/会社名様邸　工事種別' />
        </Grid>
      </Grid>

      <Grid container item xs={12} spacing={2}>
        <Grid item xs={12} md={4}>
          <ConstructionAgent/>
        </Grid>

        <Grid item xs={12} md={4}>
          <ConstructionAgent number={2}/>
        </Grid>

        <Grid item xs={12} md={4}>
          <FormControl>
            <FormControlLabel
            label="工事担当者を確定する"
            control={<Checkbox/>}
          />
            <FormHelperText>※工事担当者が未定の場合はチェックしないでください。</FormHelperText>

          </FormControl>

        </Grid>

      </Grid>


    </>
  );

};

export default ConstructionInfo;