import * as React from 'react';
import useDarkmode from './base/hooks/useDarkmode';
import CategoryMenu from './CategoryMenu';
import Footer from './Footer';
import Header from './Header';

interface IPageProps {
    pagePath: string;
    children: React.ReactNode;
}

const Applayout: React.FunctionComponent<IPageProps> = ({
    pagePath,
    children
}: IPageProps) => {
    const { dark, onClickDarkMode } = useDarkmode();
    return (
        <>
            <Header
                pagePath={pagePath}
                onClickDarkMode={onClickDarkMode}
                dark={dark}
            />
            {
                pagePath == '/Shop'
                    || pagePath == '/category/CategoryAll'
                    || pagePath == '/category/CategoryClothes'
                    || pagePath == '/category/CategoryShoes'
                    || pagePath == '/category/CategoryAccessories'
                    ?
                    <CategoryMenu />
                    :
                    ''
            }
            <main className="main nav-scroll" role="main">
                <section className="contents__container">
                    {children}
                </section>
            </main>
            <Footer />
        </>
    );
};

export default Applayout;