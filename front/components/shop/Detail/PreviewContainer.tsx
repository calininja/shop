import * as React from 'react';
import { IReviewState } from 'types/review';
import Preview from './Preview';

interface IPreviewContainerProps {
    obj: {
        id: number,
        offset: null
    }
    reviews: IReviewState[]
    allReviews: number;
    preview: boolean;
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
        <div className="product-preview">
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