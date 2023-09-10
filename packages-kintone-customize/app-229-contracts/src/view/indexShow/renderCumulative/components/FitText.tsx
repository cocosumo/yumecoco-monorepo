import { Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { getTextWidth } from '../../../../helpers/getTextWidth';

export const FitText = ({
  content,
}:{
  content: string,
}) => {

  const divRef = useRef<HTMLElement | null>(null);
  const [fontSize, setFontSize] = useState<number>(16);


  useEffect(() => {
    if (divRef.current) {
      const width = divRef.current.offsetWidth;
      
      let currFontSize = fontSize;

      while (getTextWidth(content, currFontSize) > width) {
        currFontSize -= 0.2;
      }

      if (currFontSize !== fontSize) {
        setFontSize(currFontSize);
      }

    }
  }, [content, fontSize]);


  return (
    <Typography
      ref={divRef}
      fontSize={fontSize}
    >
      {content}
    </Typography>
  ); 
};