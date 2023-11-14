import { AccordionDetails, Typography, styled } from '@mui/material';
import { ICustgroups } from 'types';
import { ResultItemTitle } from './ResultItemTitle';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';


const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square
    {...props}
  />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: 'grey.300',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

export const SearchResultItem = ({
  item,
}:{
  item: ICustgroups
}) => {
  const custNames = item.members.value.map((member) => {
    return member.value.customerName.value;
  }).join('、');

  return (
    <Accordion>
      <AccordionSummary
        id={item.uuid.value}
      >
        
        <ResultItemTitle 
          custNames={custNames}
          createDate={item.作成日時.value}
        />
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>

  );
};