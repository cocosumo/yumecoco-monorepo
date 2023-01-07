
import { useSystemUpdate } from 'kokoas-client/src/hooksQuery';
import { SystemUpdateItem } from './SystemUpdateItem';
import Carousel from 'react-spring-3d-carousel';
import { Box } from '@mui/material';
import { useState } from 'react';

export const SystemUpdate = () => {
  const [slide, setSlide] = useState({
    goToSlide: 0,
  });
  const { data, isFetching } = useSystemUpdate();
  const { records } = data || {};

  return (
    <Box
      sx={{
        width: '100%',
        height: '200px',
        userSelect: 'none',
        cursor: 'pointer',
      }}
    >
      {!isFetching && records && (
        <Carousel
          showNavigation={false}
          offsetRadius={1}
          goToSlide={slide.goToSlide}
          slides={records.map((record, index) => {
            return (
              {
                key: record.$id.value,
                content: <SystemUpdateItem record={record} />,
                onClick: () => setSlide((prev) => ({
                  ...prev,
                  goToSlide: index,
                })),
              }
            );
          })}
        />

      )}
    </Box>
  );
};