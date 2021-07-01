import * as React from 'react';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

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
        <div css={labelInput}>
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

const labelInput = css`
    position: relative;
    label{
    }
    input{
        width: 100%;
        &.custom-input{
            font: 300 13px/13px 'Noto Sans KR', sans-serif;
            text-indent: 10px;
            height: 32px;
            outline: 0;
            border:1px solid #ccc;
            border-radius: 3px;
            text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.12);
            box-shadow: 0 2px 0 rgba(0, 0, 0, 0.045);
            box-sizing: border-box;
            white-space: nowrap;
            vertical-align: middle;
            transition: all 0.2s;
            touch-action: manipulation;
            -webkit-appearance: none;
            &:focus{
                border-bottom: 1px solid #222222;
            }
        }
    }
`

export default LabelInput;