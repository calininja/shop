import * as React from 'react';
import { useCallback, useState } from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import wrapper from 'store';
import { connect, useSelector, useDispatch } from 'react-redux';
import { selectProducts } from 'selectors/product';
import { loadUser } from 'thunks';
import { addProduct, uploadImages, addCategory } from 'thunks/products';
import { deleteImage } from 'slices/products';
import SetColor from '../../components/admin/SetColor';
import SetImage from '../../components/admin/SetImage';
import useInputs from 'lib/hooks/useInputs';
import LabelInput from 'components/common/LabelInput';
import LabelTextArea from 'components/common/LabelTextArea';
import Button from 'components/common/Button';
import { toast } from 'react-toastify';

const PostForm: React.FunctionComponent = () => {

    const dispatch = useDispatch();
    const [value, onChange] = useInputs({
        title: '',
        content: '',
        size: '',
        price: '',
        category: '',
        makeCategory: ''
    })
    const { title, content, size, price, category, makeCategory } = value;
    const [color, setColor] = useState([]);
    const { imagePaths } = useSelector(selectProducts());

    // 컬러
    const onChangeColor = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>, i, colorInput) => {
        if (!color.includes(e.target.value)) {
            colorInput.current.children[i].classList.add('active');
            setColor([e.target.value, ...color]);
        }
        if (color.includes(e.target.value)) {
            const result = color.filter(v => v != e.target.value)
            setColor(result)
            colorInput.current.children[i].classList.remove('active');
        }
    }, [color])

    // 이미지 업로드/삭제
    const onClickImageUpload = useCallback((ref) => {
        ref.current.click();
    }, []);
    const onChangeImages = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const imageFormData: FormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch(uploadImages(imageFormData));
    }, []);
    const onRemoveImage = index => (e) => {
        e.preventDefault();
        dispatch(deleteImage(index));
    };

    const onSubmitMakingCategory = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(addCategory({ category: makeCategory }));
    }, [makeCategory])

    // Submit
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title) {
            toast.error('제목을 작성하세요.');
            return;
        }
        if (!content) {
            toast.error('게시글을 작성하세요.');
            return;
        }
        if (!size) {
            toast.error('사이즈를 작성하세요.');
            return;
        }
        if (!price) {
            toast.error('금액을 작성하세요.');
            return;
        }
        if (!color) {
            toast.error('색상을 선택 하세요.');
            return;
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('size', size);
        formData.append('price', price);
        formData.append('color', String(color));
        formData.append('categoryId', String(category));
        imagePaths.forEach((v) => {
            return formData.append('image', v);
        });
        dispatch(addProduct(formData));
    }, [title, content, size, color, price, imagePaths, category]);

    return (
        <section className="post-form__container">
            <h2>상품 등록</h2>
            <form action="" onSubmit={onSubmit} encType="multipart/form-data">
                <LabelInput
                    label="title"
                    name="title"
                    value={title}
                    placeholder="상품명"
                    onChange={onChange}
                    type="text"
                />
                <LabelTextArea
                    label="content"
                    name="content"
                    value={content}
                    placeholder="설명"
                    onChange={onChange}
                    cols={50}
                    rows={10}
                />
                <LabelInput
                    label="size"
                    name="size"
                    value={size}
                    placeholder="사이즈(, 구분가능)"
                    onChange={onChange}
                    type="text"
                />
                <LabelInput
                    label="price"
                    name="price"
                    value={price}
                    placeholder="가격"
                    onChange={onChange}
                    type="text"
                />
                <div className="category">
                    <select id="" name="category" value={category} onChange={onChange}>
                        <option value="">선택</option>
                        <option value="의류">의류</option>
                        <option value="신발">신발</option>
                        <option value="악세서리">악세서리</option>
                    </select>
                </div>
                <SetColor onChangeColor={onChangeColor} />
                <Button type="submit" >
                    제출하기
                </Button>
                <SetImage
                    onClickImageUpload={onClickImageUpload}
                    onChangeImages={onChangeImages}
                    onRemoveImage={onRemoveImage}
                />
            </form>
            <h3>카테고리 등록</h3>
            <form action="" onSubmit={onSubmitMakingCategory}>
                <select id="" name="makeCategory" value={makeCategory} onChange={onChange}>
                    <option value="">선택</option>
                    <option value="의류">의류</option>
                    <option value="신발">신발</option>
                    <option value="악세서리">악세서리</option>
                </select>
                <Button type="submit">
                    제출하기
                </Button>
            </form>
        </section>
    );
};

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
    const state = await context.store.getState();
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
    if (!state.users.me) await context.store.dispatch(loadUser());

    return {
        props: {
            pathname: "/PostForm",
        }
    };
}
);

export default connect(state => state)(PostForm);
