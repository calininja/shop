import * as React from 'react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from 'store/selectors/product';
import { backUrl } from 'config/config';

interface IsaveColor {
    onClickImageUpload: (imageInput) => void;
    onChangeImages: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onRemoveImage: (i: any) => (e: any) => void;
}

const SetImage: React.FunctionComponent<IsaveColor> = ({
    onClickImageUpload,
    onChangeImages,
    onRemoveImage
}) => {

    const imageInput: React.MutableRefObject<HTMLInputElement> = useRef();
    const { imagePaths } = useSelector(selectProducts());

    return (
        <>
            <div>
                <label htmlFor="">이미지 선택</label>
                <input type="file" className="custom-input" multiple hidden ref={imageInput} onChange={onChangeImages} />
                <button type="button" className="imageUploadButton" onClick={() => { onClickImageUpload(imageInput) }}><img src="" alt="이미지" /></button>
            </div>
            {imagePaths.map((v, i) => (
                <div key={v}>
                    <img src={`${backUrl}/${v}`} style={{ width: '200px' }} alt={v} />
                    <div>
                        <button className="custom-button" onClick={onRemoveImage(i)}>제거</button>
                    </div>
                </div>
            ))}
        </>
    );
};

export default SetImage;