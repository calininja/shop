import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadReviews } from '../../../store/thunks';
import { selectProducts } from '../../../store/selectors/product';

export default function useReviewLoader(obj) {
    const dispatch = useDispatch();
    const { isAddingReview, isDeletingReview } = useSelector(selectProducts());

    // 리뷰 등록/삭제 후 리로드
    useEffect(() => {
        if (isAddingReview || isDeletingReview) {
            dispatch(loadReviews(obj));
        };
        dispatch(loadReviews(obj));
    }, [isAddingReview, isDeletingReview]);

};