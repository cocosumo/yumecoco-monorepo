import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';

export const SystemUpdateContents = () => {
  const contents = [
    'スピード改善',
    'スピード改善1',
    'スピード改善2',
  ];


  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 200,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {contents.map((sectionId) => (
        <li key={sectionId}>
          <ul>
            <ListSubheader>
              {sectionId}
            </ListSubheader>
            {[0, 1, 2].map((item) => (
              <ListItem key={`item-${sectionId}-${item}`}>
                <ListItemText primary={`Item ${item}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};