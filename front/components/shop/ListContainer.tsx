import * as React from 'react';
import Link from 'next/link';
import { backUrl } from 'config/config';

interface IPostProps {
    post: any;
    posts: any;
}

const ListContainer: React.FunctionComponent<IPostProps> = ({ post, posts }) => {

    const postId = post.id;

    function colorCount(name) {
        let arr = [];
        let count = 0;
        for (let i = 0; i < posts.length; i++) {
            arr.push(posts[i]);
        }
        for (let i = 0; i < posts.length; i++) {
            if (arr[i].title === name) {
                count++;
            }
        }
        return count;
    }

    return (
        <section className="list__container">
            <Link
                href={'/shop/detail/[postId]'}
                as={`/shop/detail/${postId}`}
                key={postId}
            >
                <a>
                    {post.images && post.images[0] ?
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

export default ListContainer;