import * as React from 'react';

const Footer: React.FunctionComponent = () => {
    return (
        <section className="footer__container">
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

export default Footer;