import Grid, { Grid2Props } from '@mui/material/Unstable_Grid2';


/** 新Grid2を使ったMainContainer */
export const MainContainer2 = (props: Grid2Props) => {
  const {
    spacing = 2,
    alignItems = 'flex-start',
    justifyContent = 'flex-start',
    mb = 2,
    ...rest
  } = props;
  return (
    <Grid container
      spacing={spacing}
      alignItems={alignItems}
      justifyContent={justifyContent}
      mb={mb}
      {...rest}
    />
  );
};

