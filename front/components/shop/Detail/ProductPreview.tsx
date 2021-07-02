import * as React from 'react';
import { useCallback } from 'react';
import { IReviewState } from 'types/review';
import Rating from 'components/common/Rating';
import { showModal } from 'slices/cores';
import { loadReviews } from 'thunks';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from 'selectors/user';
import { css } from '@emotion/react';
import { font } from 'lib/styles/common';

interface IPreviewContainerProps {
    obj: {}
    reviews: IReviewState[]
    allReviews: number;
    preview: boolean;
    onPreview: () => void;
}

const ProductPreview: React.FunctionComponent<IPreviewContainerProps> = ({
    obj,
    preview,
    reviews,
    allReviews,
    onPreview
}) => {
    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());

    const onAddReviewClick = () => {
        if (!me) {
            alert('로그인이 필요합니다.');
            return;
        }
        const data = {
            visible: true,
            mode: 'ADD_REVIEW'
        }
        dispatch(showModal(data));
    }

    const onClickPopReview = useCallback(() => {
        dispatch(loadReviews(obj));
        dispatch(showModal({ visible: true, mode: 'REVIEW' }))
    }, [])

    return (
        <div css={productPreviewWrapper}>
            <span className="product__head" onClick={onPreview}>리뷰({allReviews ? allReviews : '0'})</span>
            {preview ?
                <div className="preview">
                    {reviews ? reviews.map((v, i) => {
                        if (i < 3) {
                            return (
                                <div key={v.id}>
                                    <div className="preview__head">
                                        <Rating rate={null} star={Number(v.star)} />
                                        <div className="userId">
                                            {v.users?.signinId.split('').map((v, i, arr) => {
                                                if (i > 1) {
                                                    return v.replace(v, '*');
                                                } else {
                                                    return v;
                                                }
                                            })}
                                        </div>
                                        <div className="date">{v.createdAt?.split('T', 1)}</div>
                                    </div>
                                    <div className="preview__body">
                                        {v.comment}
                                    </div>
                                </div>
                            )
                        }
                    })
                        :
                        ''
                    }
                    <a className="more-review" onClick={onClickPopReview}>
                        더 많은 리뷰 보기
                    </a>
                    <a className="add-review" onClick={onAddReviewClick}>리뷰 작성하기</a>
                </div>
                :
                ''
            }
        </div>
    );
};

const productPreviewWrapper = css`
    .product__head{
        cursor: pointer;
    }
    .more-review, .add-review{
        display: inline-block;
        font: 400 12px/12px ${font.noto};
        color: #000000;
        text-decoration: underline;
        padding: 0;
        margin: 10px 5px;
    }
    .preview{
        margin: 25px 0;
        >div{
            margin: 30px 0;
            .preview__head{
                >div{
                    display: inline-block;
                    vertical-align: middle;
                }
                .userId{
                    margin: 0 10px 0 20px;
                }
                .userId, .date{
                    font: 400 12px/12px ${font.noto};
                    color: #6d6d6d;
                }
            }
            .preview__body{
                font: 400 14px/18px ${font.noto};
                color: #000000;
                margin-top: 10px;
                white-space: pre-line; 
                width: 50%;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
            }
        }
    }

`

export default ProductPreview;