import * as React from 'react';
import { IMaskInput } from 'react-imask';



interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const TextMaskPostal = React.forwardRef<HTMLElement, CustomProps>(

  function TextMaskCustom(props, _) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="000-0000"
        onAccept={(value: any) => {
          if (value){ // Have to check for value as this assign value even on unmounted item of formik's fieldArray
            onChange({ target: { name: props.name, value } });
          }
        }}
        overwrite

      />
    );
  },
);