import * as React from 'react';
import { css } from '@emotion/react';
import { font } from 'lib/styles/common';

type InputProps = React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>;

export interface ILabelInputProps extends InputProps {
    placeholder?: string;
    name?: string;
    value?: string;
    onChange?: React.ChangeEventHandler;
}

const Input: React.FunctionComponent<ILabelInputProps> = ({
    name,
    value,
    placeholder,
    onChange,
    ...rest
}) => {

    return (
        <input
            css={input}
            placeholder={placeholder}
            className="custom-input"
            name={name}
            value={value}
            onChange={onChange}
            {...rest}
        />
    );
};

const input = css`
    input{
        width: 100%;
        &.custom-input{
            font: 300 13px/13px ${font.noto};
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

export default Input;