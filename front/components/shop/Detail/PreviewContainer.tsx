import * as React from 'react';
import { useCallback } from 'react';
import Rating from 'components/common/Rating';
import { selectUsers } from 'selectors/user';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from 'slices/cores';
import { loadReviews } from 'thunks';
import Preview from './Preview';

interface IPreviewContainerProps {
    obj: any;
    preview: any;
    reviews: any;
    allReviews: any;
    onClickPreview: () => void;
}

const PreviewContainer: React.FunctionComponent<IPreviewContainerProps> = ({
    obj,
    preview,
    reviews,
    allReviews,
    onClickPreview,
}) => {

    return (
        <div className="product-review__container">
            <span className="product__head" onClick={onClickPreview}>리뷰({allReviews ? allReviews : '0'})</span>
            {preview ?
                <Preview
                    reviews={reviews}
                    obj={obj}
                />
                :
                ''
            }
        </div>
    );
};

export default PreviewContainer;