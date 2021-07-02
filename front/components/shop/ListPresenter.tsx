import * as React from 'react';
import Link from 'next/link';
import { backUrl } from 'config/config';
import { IProductState } from 'types/product';
import { css } from '@emotion/react';
import media from 'lib/styles/media';
import { after, font } from 'lib/styles/common';

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
        <div css={ListPresenterWrapper}>
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
        </div>
    );
};

const ListPresenterWrapper = css`
    float: left;
    width: 25%;
    margin-bottom: 50px;
    .list__container{
        padding: 0.3rem;
        a{
            display: inline-block;
            width: 100%;
            .list-image{
                width: 100%;
            }
            .list__description{
                width: 95%;
                ${media.large} {
                    position: relative;
                    left: 0.5rem;
                };
                .list__wrapper{
                    ${after()}
                    .list__title, .list__price{
                        display: block;
                        font: 400 14px/14px ${font.noto};
                        color: #111111;
                        text-align: left;
                        margin: 1rem 0;
                        white-space: pre-wrap;
                        word-break: break-all;
                        ${media.large} {
                            &.list__title, &.list__price{
                                float: unset;
                            }
                        }
                    }
                    .list__title{
                        float: left;
                    }
                    .list__price{
                        float: right;
                    }
                }
                .list__options, .list__categories{
                    span{
                        font: 300 14px/25px ${font.noto};
                        color: #8d8d8d;
                    }
                }
            }
        }
        ${media.large} {
            padding: 0;
        }
    }
    ${media.large} {
        float: left;
        width: 50%;
    }
`

export default ListPresenter;