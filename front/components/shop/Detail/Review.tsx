import * as React from 'react';
import { useCallback } from 'react';
import Router from "next/router";
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from 'store/selectors/user';
import { selectProducts } from 'store/selectors/product';
import { deleteReviews } from 'store/thunks';
import Pagination from 'components/common/Pagination';
import Rating from 'components/common/Rating';
import { css } from '@emotion/react';
import media from 'lib/styles/media';
import { font } from 'lib/styles/common';
import { backUrl } from 'config/config';
import { toast } from 'react-toastify';

const Review: React.FunctionComponent = ({
}) => {

    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());
    const { reviews, product, allReviews } = useSelector(selectProducts());

    const showDeleteConfirm = useCallback((id) => {
        if (confirm("삭제 하시겠습니까?") == true) {
            dispatch(deleteReviews(id))
            toast.info('삭제 되었습니다.');
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
        <section css={reviewContainer}>
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

const reviewContainer = css`
    position: relative;
    .review__wrapper{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        margin: 0 auto;
        overflow-y: auto;
        border: 1px solid #cccccc;
        background: #ffffff;
        z-index: 3;
        .review__nav{
            display: flex;
            justify-content: end;
            position: fixed;
            top: 0;
            width: 100%;
            border-bottom: 1px solid #d8d8d8;
            background: #ffffff;
            padding: 1rem;
            text-align: right;
            box-sizing: border-box;
            z-index: 2;
            >div, h2, .close{
                flex-basis: 33.3%;
                vertical-align: middle;
            }
            >div{
                text-align: left;
                white-space: nowrap;
                .review__head__img{
                    display: inline-block;
                    width: 80px;
                    vertical-align: middle;
                    img{
                        width: 100%;
                    }
                }
                .review__head__info{
                    display: inline-block;
                    vertical-align: middle;
                    margin-left: 15px;
                    >span{
                        display: block;
                        font: 300 14px/20px ${font.noto};
                        color: #000000;
                    }
                }
            }
            h2{
                text-align: center;
                font: 300 24px/24px ${font.noto};
                color: #000000;
                margin: 30px 0;
                em{
                    font: 400 26px/26px ${font.noto};
                    color: inherit;
                }
            }
            .close{
                text-align: right;
                background: none;
                border: 0;
                font-size: 18px;
                z-index: 4;
            }
            ${media.large} {
                h2{
                    display: none;
                }
            }
        }
        .review__contents{
            width: 60%;
            margin: 0 auto;
            .review__item{
                min-height: 300px;
                padding: 25px 15px;
                margin: 20px 0;
                border-top: 1px solid #cccccc;
                @include after();
                .review__head{
                    .delete{
                        float: right;
                        background: none;
                        border: 0;
                    }
                    .userId, .date{
                        display: inline-block;
                        font: 400 12px/12px ${font.noto};
                        color: #6d6d6d;
                        margin-top: 20px;
                        &.date{
                            margin: 0 10px 0 20px;
                        }
                    }
                }
                .review__body{
                    margin-top: 20px;
                    >img{
                        display: block;
                        width: 130px;
                    }
                    .comment{
                        font: 400 16px/20px ${font.noto};
                        color: #111111;
                        margin-top: 20px;
                        white-space: pre-line;
                    }
                }
            }
            ${media.large} {
                width: 100%;
                margin: 0 auto;
                .review__item{
                    .review__body{
                        .comment{
                            white-space: pre-line;
                        }
                    }
                }
            }
        }
        .pagination__container{
            padding: 0 0 80px 0;
            ${media.large} {
                position: fixed;
                bottom: 0;
                width: 100%;
                padding: 20px 0 80px 0;
                background: #ffffff;
            }
        }
    }
    .review__wrapper::-webkit-scrollbar {
        width: 2px;
    }
    .review__wrapper::-webkit-scrollbar-thumb {
        background: #cccccc;
    }
    .review__wrapper::-webkit-scrollbar-track {
        background: #ffffff;
    }
`

export default Review;