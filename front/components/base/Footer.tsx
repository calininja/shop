import * as React from 'react';
import { css } from '@emotion/react';
import { font } from '../../lib/styles/common';

const Footer: React.FunctionComponent = () => {
    return (
        <section css={footerContainer}>
            <div className="footer__wrapper">
                <div className="icons">아이콘 영역</div>
                <div className="footer__menu">
                    <ul>
                        <li><a href="/Shop">메뉴1</a></li>
                        <li><a href="/Shop">메뉴2</a></li>
                        <li><a href="/Shop">메뉴3</a></li>
                    </ul>
                </div>
                <p>Terms of Use Privacy Policy</p>
                <span>© 2021 SHOP</span>
            </div>
        </section>
    );
};

const footerContainer = css`
    background: #ffffff;
    border-top: 1px solid #cccccc;
    width: 95%;
    margin: 0 auto;
    .footer__wrapper{
        text-align: center;
        padding: 100px 0;
        .icons{
            text-indent: -9999px;
        }
        .footer__menu{
            ul{
                li{
                    display: inline-block;
                    margin: 0 10px;
                    a{
                        font: 300 12px/12px ${font.noto};
                        color: #111111;
                    }
                }
            }
        }
        p{
            font: 300 12px/12px ${font.noto};
            color: #515154;
            text-align: center;
            margin: 10px 0;
        }
        span{
            font: 300 12px/12px ${font.noto};
            color: #515154;
            margin: 10px 0;
        }
    }
`

export default Footer;