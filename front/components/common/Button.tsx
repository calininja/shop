import * as React from 'react';
type ButtonProps =
    React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement>

export interface IButtonProps extends ButtonProps {
}

const Button: React.FunctionComponent<IButtonProps> = ({
    children,
    ...rest
}) => {
    return (
        <button
            className="custom-button"
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;