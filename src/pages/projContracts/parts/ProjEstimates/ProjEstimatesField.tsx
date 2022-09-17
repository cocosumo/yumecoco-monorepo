import { Grid, Grow, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmptyBox } from '../../../../components/ui/information/EmptyBox';
import { ItemEstimate } from './ItemEstimate';
import { SelectProjEstimates } from './SelectProjEstimate';

export const ProjEstimatesField = ({
  projId,
  status,
  estimatesRecord,
  handleSearchTTClose, handleSearchTTOpen,
}: {
  projId: string,
  status: TFormStatus,
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
        onClick={()=>navigate('/')}
        variant="text" color={'inherit'}
        fullWidth disableRipple
      >
        見積作成
      </Button>
    ),
  }),
  /** navigateは依存配列として不安定 */
  []);

  const actualOptions: OptionNode[] = estimatesRecord.map<OptionNode>((rec)=>{
    const { contractPrice, $id, 作成日時 } = rec;
    return {
      value: $id.value,
      key: $id.value,
      component: <ItemEstimate contractPrice={contractPrice.value} dateCreated={作成日時.value} id={$id.value} />,
    };
  });


  return (

    <Grid item xs={12} md={8} >

      <Grow in={!!projId && status === ''} timeout={1000} mountOnEnter
        unmountOnExit
      >
        <Box sx={{ position: 'relative' }}>
          {!!projId &&
          <SelectProjEstimates
            options={[emptyOption, ...actualOptions, registerNewOption  ]}
          />}
        </Box>
      </Grow>

      <Grow in={!projId && status === ''} timeout={1000} mountOnEnter
        unmountOnExit
      >
        <Box sx={{ position: 'relative' }}>
          {!projId &&
          <EmptyBox onMouseEnter={handleSearchTTOpen} onMouseLeave={handleSearchTTClose}>
            工事名で検索してください
          </EmptyBox>}
        </Box>
      </Grow>
    </Grid>
  );
};