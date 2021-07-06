import * as React from 'react';
import Link from 'next/link';
import { css } from '@emotion/react';
import { font } from 'lib/styles/common';

const CategoryMenu: React.FunctionComponent = () => {

    return (
        <section css={categoryMenuWrapper}>
            <div className="category-menu__wrapper">
                <Link href="/shop/list/CategoryAll"><a className="category-menu">전체</a></Link>
                <Link href="/shop/list/CategoryClothes"><a className="category-menu">의류</a></Link>
                <Link href="/shop/list/CategoryShoes"><a className="category-menu">신발</a></Link>
                <Link href="/shop/list/CategoryAccessories"><a className="category-menu">악세서리</a></Link>
            </div>
        </section>
    );
};

const categoryMenuWrapper = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    flex: 1;
    background: rgba(245,245,247,1);
    text-align: center;
    width: 100%;
    &.fixed{
        position: fixed;
        top: 49px;
        z-index: 2;
    }
    .category-menu__wrapper{
        width: 450px;
        .category-menu{
            display: inline-block;
            font: 400 14px/14px ${font.noto};
            color: #5e5e5e;
            letter-spacing: 1px;
            padding: 20px 0;
            width: 25%;
            transition: all 0.1s;
            &:hover{
                color: #06c;
            }
        }
    }
`

export default CategoryMenu;