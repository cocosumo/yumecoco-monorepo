
import { useSystemUpdate } from 'kokoas-client/src/hooksQuery';
import { SystemUpdateItem } from './SystemUpdateItem';
import Carousel from 'react-spring-3d-carousel';
import { Box } from '@mui/material';
import { useState } from 'react';
import { config } from 'react-spring';

export const SystemUpdate = () => {
  const [slide, setSlide] = useState({
    goToSlide: 0,
    offsetRadius: 2,
    config: config.gentle,
  });
  const { data, isFetching } = useSystemUpdate();
  const { records } = data || {};

  return (
    <Box width={'100%'}
      height={'200px'}
    >
      {!isFetching && records && (
        <Carousel
          showNavigation={false}
          offsetRadius={4}
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