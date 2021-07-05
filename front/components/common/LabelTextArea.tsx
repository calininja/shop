import * as React from 'react';
import { memo } from 'react';

type TextAreaProps =
  React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement>

export interface LabelTextAreaProps extends TextAreaProps {
  label: string;
  placeholder?: string;
  name?: string;
  value?: string;
  onChange?: React.ChangeEventHandler;
}

const LabelTextArea: React.FunctionComponent<LabelTextAreaProps> = ({
  label,
  name,
  value,
  placeholder,
  onChange,
  ...rest
}) => {

  return (
    <div className="label-textarea__block">
      <label htmlFor="">{label}</label>
      <textarea
        placeholder={placeholder}
        className="custom-input"
        name={name}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
};

export default memo(LabelTextArea);