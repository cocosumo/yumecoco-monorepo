import { Button, Dialog, DialogActions, DialogContent, DialogTitle, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Radio } from '@mui/material';
import { useFormikContext } from 'formik';
import { useEffect, useState } from 'react';
import { getProjectsByCustGroupId, SearchItems } from '../../../../api/getProjectsByCustGroupId';
import { ConstructionDetailsType, KeyOfConstructionDetails } from '../../../../form';


export const SearchDialog = (props: {
  open: boolean,
  handleClose: ()=>void
}) => {
  const { open, handleClose } = props;
  const [records, setRecords] = useState<SearchItems | null>(null);
  const [selected, setSelected] = useState<number | null>(null);
  const { setFieldValue, values: { custGroupId } } = useFormikContext<ConstructionDetailsType>();

  const handleCopy = () => {
    if (selected !== null && records) {
      const { postal, address1, address2 } = records[selected];
      setFieldValue('postal' as KeyOfConstructionDetails, postal);
      setFieldValue('address1' as KeyOfConstructionDetails, address1);
      setFieldValue('address2' as KeyOfConstructionDetails, address2);

    }

    handleClose();

  };

  useEffect(()=> {
    if (custGroupId && open){
      getProjectsByCustGroupId(custGroupId)
        .then((resp) => {
          setRecords(resp);
        });
    }
  }, [custGroupId, open]);

  console.log('records', records);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogTitle>
        過去プロジェクトの工事場所をコピーしますか。
      </DialogTitle>
      <DialogContent>
        <List>
          {records?.map(({ constructionName, postal, address1, address2 }, idx) => {
            console.log(constructionName);
            return (
              <ListItem
                key={constructionName}
                divider
              >
                <ListItemButton onClick={()=>setSelected(idx)}>
                  <ListItemIcon>
                    <Radio checked={selected === idx} disableRipple/>
                  </ListItemIcon>
                  <ListItemText
                    primary={constructionName}
                    secondary={`${postal} ${address1}${address2}`}
                  />
                </ListItemButton>
              </ListItem>

            );
          })}

        </List>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={handleClose}>キャンセル</Button>
        <Button variant="contained" disabled={selected === null} onClick={handleCopy}>確定</Button>
      </DialogActions>

    </Dialog>
  );
};