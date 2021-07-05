import * as React from 'react';
import useDarkmode from './hooks/useDarkmode';
import CategoryMenu from './CategoryMenu';
import Header from './Header';
import Footer from './Footer';
import { css } from '@emotion/react';
import media from 'lib/styles/media';

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
        <section css={appLayoutContainer}>
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
        </section>
    );
};

const appLayoutContainer = css`
    section{
        position: relative;
    }
    main{
        overflow: hidden;
        .contents__container{
            width: 90%;
            min-width: 90%;
            margin: 0 auto 150px;
            ${media.large} {
                width: 100%;
                min-width: unset;
                margin-top: 0;
            }
        }
    }
`

export default Applayout;