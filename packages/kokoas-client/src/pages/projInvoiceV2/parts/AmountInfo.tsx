import { Stack, StackProps, Typography, TypographyVariant } from '@mui/material';



export const AmountInfo = ({
  label,
  value,
  justifyContent,
  labelVariant = 'body2',
  valueVariant = 'body1',
  hasUnderLine = true,
  width = '15%',
}: {
  label: string,
  value: string,
  justifyContent?: StackProps['justifyContent']
  labelVariant?: TypographyVariant
  valueVariant?: TypographyVariant
  hasUnderLine?: boolean
  width?: string
}) => {

  return (

    <Stack
      direction={'row'}
      justifyContent={justifyContent}
      alignItems={'flex-end'}
    >
      <Typography variant={labelVariant} width={'100px'}>
        {label}
      </Typography>
      <Typography
        variant={valueVariant}
        component={'span'}
        width={width}
        align={'right'}
        style={{
          position: 'relative',
          display: 'inline-block',
        }}
      >
        {value}
        {hasUnderLine &&
          <span
            style={{
              position: 'absolute',
              bottom: '-2px', // Adjust this value as needed
              left: '0',
              width: '100%',
              borderBottom: '1px solid black',
            }}
          />}
      </Typography>
    </Stack>
  );
};
