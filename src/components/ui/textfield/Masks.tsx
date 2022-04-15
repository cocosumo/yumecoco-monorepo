import * as React from 'react';
import { IMaskInput } from 'react-imask';



interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const TextMaskPostal = React.forwardRef<HTMLElement, CustomProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function TextMaskCustom(props, _) {

    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}

        mask="000-0000"
        onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
        overwrite

      />
    );
  },
);