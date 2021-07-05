import * as React from 'react';
import { useRef } from 'react';
import { css } from '@emotion/react';

interface IProgressProps {
    progress: any;
}

const ProgressBar: React.FunctionComponent<IProgressProps> = ({ progress }) => {

    const popupRef: React.MutableRefObject<HTMLInputElement> = useRef(null);

    return (
        <div css={progressBarWrapper(progress)} ref={popupRef}>
            <div></div>
        </div>
    );
};

const progressBarWrapper = (progress) => css`
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
    div{
        width: 1px;
        height: 2px;
        background: red;
        width: ${progress}%;
        ${progress && css`
            transition: all 1s linear;
        `}
        transition: all 1s linear;
    }
`

export default ProgressBar;