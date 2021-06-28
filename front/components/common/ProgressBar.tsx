import * as React from 'react';
import { useRef } from 'react';

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
        <section className="progress-bar__container" ref={popupRef}>
            <div style={!progress ? css3('none') : css3('all 1s linear')}></div>
        </section>
    );
};

export default ProgressBar;