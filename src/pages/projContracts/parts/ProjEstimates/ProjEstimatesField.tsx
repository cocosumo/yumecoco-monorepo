import { Grid, Grow, Button, Box } from '@mui/material';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormikSelectAdvanced } from '../../../../components/ui/selects/FormikSelectAdvanced';
import { generateParams } from '../../../../helpers/url';
import { pages } from '../../../Router';
import { getFieldName } from '../../form';
import { ErrorNoEstimates } from './ErrorNoEstimates';
import { ErrorNoProjSelected } from './ErrorNoProjSelected';
import { ItemEstimate } from './ItemEstimate';

export const ProjEstimatesField = ({
  projId,
  projEstimateId,
  status,
  estimatesRecord,
  handleSearchTTClose, handleSearchTTOpen,
}: {
  projId: string,
  status: TFormStatus,
  projEstimateId: string,
  estimatesRecord: ProjectEstimates.SavedData[],
  handleSearchTTOpen: () => void,
  handleSearchTTClose: () => void
}) => {

  const navigate = useNavigate();


  const emptyOption: OptionNode = useMemo(() =>  ({
    value: '',
    key: 'clear',
    component: '---',
  }), []);

  const registerNewOption: OptionNode = useMemo(() =>  ({
    value: '',
    key: 'new',
    component: (
      <Button
        onClick={() => navigate(`${pages.projEstimate}?${generateParams({ projId })}`)}
        variant="text" color={'inherit'}
        fullWidth disableRipple
      >
        見積作成
      </Button>
    ),
  }),
  /** navigateは依存配列として不安定 */
  [projId]);

  const actualOptions: OptionNode[] = estimatesRecord.map<OptionNode>((rec)=>{
    const { contractPrice, $id, 作成日時 } = rec;
    return {
      value: $id.value,
      key: $id.value,
      component: <ItemEstimate contractPrice={contractPrice.value} dateCreated={作成日時.value} id={$id.value} />,
    };
  });

  const isWithProjId = !!projId && status === '';
  const isWithProjIdWithEstimates = isWithProjId && !!estimatesRecord.length;
  const isWithProjIdNoEstimates = isWithProjId && !estimatesRecord.length;

  return (

    <Grid item xs={12} md={8} >


      <Grow in={true} timeout={1000} mountOnEnter
        unmountOnExit
      >
        <Box sx={{ position: 'relative', top: 0 }}>

          {/* 工事名が選択されている場合 */}
          {isWithProjIdWithEstimates &&
          <FormikSelectAdvanced
            label='見積もりリスト'
            name={getFieldName('projEstimateId')}
            selectedValue={projEstimateId}
            options={[emptyOption, ...actualOptions, registerNewOption  ]}
          />}

          {/* 工事名が選択されているが、見積もりがない場合 */}
          {isWithProjIdNoEstimates &&
          <ErrorNoEstimates projId={projId} />}

          {/* 工事名が選択されていない場合 */}
          {!isWithProjId &&
          <ErrorNoProjSelected
            isWithProjId={isWithProjId}
            handleSearchTTOpen={handleSearchTTOpen}
            handleSearchTTClose={handleSearchTTClose}
          />}


        </Box>
      </Grow>

    </Grid>
  );
};