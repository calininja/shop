import * as React from 'react';
import { useRef } from 'react';

interface IsaveColor {
    onChangeColor: (e: any, i: any, colorInput: any) => void;
}

const SaveColor: React.FunctionComponent<IsaveColor> = ({ onChangeColor }) => {

    const colorInput: React.MutableRefObject<HTMLInputElement> = useRef(null);
    const colorArray = [
        { 'background': '#fd0000' },
        { 'background': '#fdde00' },
        { 'background': '#005afd' }
    ]

    return (
        <>
            <div className="color" ref={colorInput}>
                {
                    colorArray.map((v, i) => {
                        return (
                            <input name="background" key={i} value={v.background} style={v}
                                onClick={(e) => {
                                    onChangeColor(e, i, colorInput)
                                }}>
                            </input>
                        )
                    })
                }
            </div>
        </>
    );
};

export default SaveColor;