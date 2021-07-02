import * as React from 'react';
import { useRef } from 'react';
import { css } from '@emotion/react';

interface IProgressProps {
    progress: any;
}

const ProgressBar: React.FunctionComponent<IProgressProps> = ({ progress }) => {

    const popupRef: React.MutableRefObject<HTMLInputElement> = useRef(null);

    function css3(val) {
        const width = {
            'width': progress + '%',
            'transition': `${val}`,
        }
        return width;
    }

    return (
        <div css={progressBarWrapper} ref={popupRef}>
            <div style={!progress ? css3('none') : css3('all 1s linear')}></div>
        </div>
    );
};

const progressBarWrapper = css`
    width: 100%;
    overflow: hidden;
    margin-top: 20px;
    div{
        width: 1px;
        height: 2px;
        background: red;
    }
`

export default ProgressBar;