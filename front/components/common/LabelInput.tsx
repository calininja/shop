import * as React from 'react';

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export interface ILabelInputProps extends InputProps {
    label: string;
    placeholder?: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler;
}

const LabelInput: React.FunctionComponent<ILabelInputProps> = ({
    label,
    name,
    value,
    placeholder,
    onChange,
    ...rest
}) => {

    return (
        <div className="label-input__block">
            <label htmlFor="">{label}</label>
            <input
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

export default LabelInput;