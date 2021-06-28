import * as React from 'react';
import { useCallback } from 'react';
import Rating from 'components/common/Rating';
import { selectUsers } from 'selectors/user';
import { useSelector, useDispatch } from 'react-redux';
import { showModal } from 'slices/cores';
import { loadReviews } from 'thunks';

interface IPreviewsProps {
    reviews: any;
    obj: any;
}

const Preview: React.FunctionComponent<IPreviewsProps> = ({
    reviews,
    obj
}) => {
    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());

    const onAddReviewClick = () => {
        if (!me) return alert('로그인이 필요합니다.');
        const data = {
            visible: true,
            mode: 'ADD_REVIEW'
        }
        dispatch(showModal(data));
    }

    // 리뷰 팝업
    const onClickPopReview = useCallback(() => {
        dispatch(loadReviews(obj));
        dispatch(showModal({ visible: true, mode: 'REVIEW' }))
    }, [])

    return (
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
    );
};

export default Preview;