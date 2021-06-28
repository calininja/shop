import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from 'selectors/user';
import { selectProducts } from 'selectors/product';
import { deleteReviews } from 'thunks';
import { backUrl } from 'config/config';
import Router from "next/router";
import Pagination from 'components/common/Pagination';
import Rating from '../../common/Rating';
import { showModal } from 'slices/cores';

const Review: React.FunctionComponent = ({
}) => {

    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());
    const { reviews, product, allReviews } = useSelector(selectProducts());

    const close = () => {
        dispatch(showModal({ visible: false, mode: 'LOGIN' }));
    }

    const showDeleteConfirm = useCallback((id) => {
        if (confirm("삭제 하시겠습니까?") == true) {
            dispatch(deleteReviews(id))
            alert('삭제 되었습니다.');
            Router.push(`/shop/detail/${product.id}`);
        } else {
            return false;
        }
    }, []);

    function totalRating() {
        const arr = [];
        let len = reviews.length > 1 && reviews.length;
        for (let i = 0; i < len; i++) {
            arr.push(Number(reviews[i].star));
        };
        const result = arr.length > 0 && arr.reduce((acc, cur, i) => acc + cur);
        return Number(result / len);
    }

    return (
        <section className="review__container">
            <div className="review__wrapper">
                <div className="review__nav">
                    <div>
                        <div className="review__head__img">
                            <img src={`${backUrl}/${product.images[0].src}`} alt="" />
                        </div>
                        <div className="review__head__info">
                            <Rating rate={null} star={totalRating()} />
                            <span>{product.title}</span>
                            <span>{product.price}원</span>
                        </div>
                    </div>
                    <h2><em>{allReviews}</em>개의 <em>REVIEWS</em></h2>
                    <button className="close" onClick={close}>X</button>
                </div>
                <div className="review__contents">
                    {reviews ? reviews.map((v, i, arr) => {
                        return (
                            <div className="review__item" key={v.id}>
                                <div className="review__head">
                                    {
                                        v.users?.id == me?.id ? <button className="delete" onClick={() => { showDeleteConfirm(v.id) }}>삭제</button> : ''
                                    }
                                    <Rating rate={() => { return false; }} star={Number(v.star)} />
                                    <div className="userId">
                                        {v.users?.signinId.split('').map((v, i, arr) => {
                                            if (i > 1) {
                                                return v.replace(v, '*');
                                            } else {
                                                return v;
                                            }
                                        })}
                                    </div>
                                    <div className="date">{reviews[0] ? reviews[0].createdAt?.split('T', 1) : ''}</div>
                                </div>
                                <div className="review__body">
                                    <img src={`${backUrl}/${product.images[0].src}`} alt="상품이미지" />
                                    <div className="comment">{v.comment}</div><br />
                                </div>
                            </div>
                        )
                    })
                        :
                        ''
                    }
                </div>
                <Pagination reviews={reviews} />
            </div>
        </section>
    );
};

export default Review;