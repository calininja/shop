import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../../store/thunks/products';
import { selectProducts } from '../../../store/selectors/product';
import Router from "next/router";
import Rating from '../../common/Rating';
import { css } from '@emotion/react';
import { font } from '../../../lib/styles/common';
import media from '../../../lib/styles/media';
import Button from '../../../components/common/Button';
import { toast } from 'react-toastify';

const AddReviewForm: React.FunctionComponent = ({
}) => {

    const dispatch = useDispatch();
    const [star, setStar] = useState(1);
    const [comments, setComments] = useState('');
    const { product, reviews, isAddingReview } = useSelector(selectProducts());

    const rate = (star) => setStar(star);

    const onChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => setComments(e.target.value);

    // Submit
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (comments == '' || comments.length < 10) {
            toast.error('10 글자 이상 작성 부탁 드립니다.');
            return;
        }
        if (!comments || !comments.trim()) {
            toast.error('내용을 작성 하세요.');
            return;
        }
        const formData = new FormData();
        formData.append('star', String(star));
        formData.append('comment', comments);
        formData.append('prdId', product.id);
        dispatch(addReview(formData));
        Router.push(`/shop/detail/${product.id}`);
        toast.info('등록 되었습니다.');
    }, [comments, product, reviews, isAddingReview]);

    return (
        <section css={addReviewsFormWrapper}>
            <Rating rate={rate} star={star} />
            <form action="" onSubmit={onSubmit}>
                <textarea name="add-review-form__comments"
                    placeholder="리뷰" className="custom-input" maxLength={100} cols={50} rows={10} value={comments} onChange={onChangeComment} />
                <Button type='submit'>등록</Button>
            </form>
        </section>
    );
};

const addReviewsFormWrapper = css`
    width: 500px;
    height: auto;
    padding: 1rem;
    background-color: #ffffff;
    z-index: 1;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 2px 12px 0px;
    @include after();
    .close{
        float: right;
        background: none;
        border: 0;
        font: inherit;
    }
    textarea{
        width: 96%;
        height: auto;
        margin: 10px 0;
        padding: 10px;
        font: 300 16px/25px ${font.noto};
        color: #111111;
        border: 1.5px solid #111111;
        resize: none;
        text-indent: 0;
    }
    .custom-button{
        display: block;
        vertical-align: top;
        margin: 0 0 0 auto;
    }
    ${media.large} {
        width: 90%;
        margin: 0 auto;
    }
`

export default AddReviewForm;