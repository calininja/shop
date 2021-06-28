import * as React from 'react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addReview } from '../../../thunks/products';
import { selectProducts } from 'selectors/product';
import Router from "next/router";
import Rating from '../../common/Rating';

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
        if (comments == '' || comments.length < 10) return alert('10 글자 이상 작성 부탁 드립니다.');
        if (!comments || !comments.trim()) return alert('내용을 작성 하세요.');
        const formData = new FormData();
        formData.append('star', String(star));
        formData.append('comment', comments);
        formData.append('prdId', product.id);
        dispatch(addReview(formData));
        Router.push(`/shop/detail/${product.id}`);
        alert('등록 되었습니다.');
    }, [comments, product, reviews, isAddingReview]);

    return (
        <section className="add-review-form__container">
            <Rating rate={rate} star={star} />
            <form action="" onSubmit={onSubmit}>
                <textarea name="add-review-form__comments"
                    placeholder="리뷰" className="custom-input" maxLength={100} cols={50} rows={10} value={comments} onChange={onChangeComment} />
                <button className="custom-button" type='submit'>등록</button>
            </form>
        </section>
    );
};

export default AddReviewForm;