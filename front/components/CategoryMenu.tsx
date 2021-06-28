import * as React from 'react';
import Link from 'next/link';

const CategoryMenu: React.FunctionComponent = () => {

    return (
        <section className="category-menu__container">
            <div className="category-menu__wrapper">
                <Link href="/shop/category/CategoryAll"><a className="category-menu">전체</a></Link>
                <Link href="/shop/category/CategoryClothes"><a className="category-menu">의류</a></Link>
                <Link href="/shop/category/CategoryShoes"><a className="category-menu">신발</a></Link>
                <Link href="/shop/category/CategoryAccessories"><a className="category-menu">악세서리</a></Link>
            </div>
        </section>
    );
};

export default CategoryMenu;