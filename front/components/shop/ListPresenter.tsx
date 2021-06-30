import * as React from 'react';
import Link from 'next/link';
import { backUrl } from 'config/config';
import { IProductState } from 'types/product';

interface IListPresenterProps {
    postId: number;
    post: IProductState;
    colorCount: (name: string) => number;
}

const ListPresenter: React.FunctionComponent<IListPresenterProps> = ({
    postId,
    post,
    colorCount
}) => {

    return (
        <section className="list__container">
            <Link
                href={'/shop/detail/[postId]'}
                as={`/shop/detail/${postId}`}
                key={postId}
            >
                <a>
                    {
                        post.images && post.images[0] ?
                            <img src={`${backUrl}/${post.images[0].src}`} className="list-image" alt="이미지" />
                            :
                            ''
                    }
                    <div className="list__description">
                        <div className="list__wrapper">
                            <p className="list__title">
                                {post.title}
                            </p>
                            <p className="list__price">
                                {post.price ? post.price.toLocaleString() : ''} 원
                            </p>
                        </div>
                        <div className="list__categories">
                            <span>{post.categories.name}</span>
                        </div>
                        <div className="list__options">
                            <span>
                                {colorCount(post.title)}
                                컬러</span>
                        </div>
                    </div>
                </a>
            </Link>
        </section>
    );
};

export default ListPresenter;