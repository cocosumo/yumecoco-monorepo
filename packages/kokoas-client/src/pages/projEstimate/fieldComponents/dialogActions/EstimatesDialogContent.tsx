import { DialogContent, FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { ListItemEstimate } from './ListItemEstimate';
import { useEstimatesByProjId } from 'kokoas-client/src/hooksQuery';


export interface EstimatesDialogContentProps {
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  projId: string
  value: string
}
export const EstimatesDialogContent = (props: EstimatesDialogContentProps) => {
  const { name, onChange, projId, value } = props;


  const { data } = useEstimatesByProjId(projId);

  const {
    records,
  } = data || {};

  /**
   * 選択肢の生成
   */
  const actualOptions: OptionNode[] = records?.map<OptionNode>((rec) => {
    const { $id } = rec;

    return {
      value: $id.value,
      key: $id.value,
      component: (<ListItemEstimate estimateRecord={rec} />),
    };
  }) || [];


  return (
    <DialogContent dividers>
      {Boolean(actualOptions.length) &&
        <RadioGroup
          name={name}
          aria-label={name}
          value={value}
          onChange={onChange}
        >
          {actualOptions?.map((option) => {
            return (
              <FormControlLabel
                key={option.key}
                value={option.value}
                control={<Radio />}
                label={option.component}
              />
            );
          })}

        </RadioGroup>}


      {!(actualOptions.length) &&
        <Stack direction={'row'} spacing={1}>
          <WarningAmberIcon />
          <Typography variant='body2'>
            見積もりはまだ作成されていません
          </Typography>
        </Stack>}

    </DialogContent>
  );
};