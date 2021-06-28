import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from 'selectors/user';
import { selectOrders } from 'selectors/order';
import { signOutUser } from 'thunks';
import { loadCart } from 'thunks/orders';
import { showModal } from 'slices/cores';
import Link from 'next/link';

interface IPagePathProps {
    pagePath: string;
    onClickDarkMode: (e) => void;
    dark: boolean;
}

const Header: React.FunctionComponent<IPagePathProps> = ({
    pagePath,
    onClickDarkMode,
    dark
}) => {

    const dispatch = useDispatch();
    const { me } = useSelector(selectUsers());
    const { orders, nonMemberCart } = useSelector(selectOrders());
    const id = me && orders ? orders.length : orders.length;

    const onLogout = useCallback(() => {
        dispatch(signOutUser());
        dispatch(loadCart(null));
    }, [])

    const onLoginClick = () => dispatch(showModal({ visible: true, mode: 'LOGIN' }));

    return (
        <section className="header__container">
            <Link href="/"><a className="header__menu">HOME</a></Link>
            <Link href="/shop"><a className="header__menu">SHOP</a></Link>
            <Link href="/about"><a className="header__menu">ABOUT</a></Link>
            {
                <Link
                    href={'/cart'}
                    as={'/cart'}
                    key={id}
                >
                    <a className="header__menu cart">{me ? orders.length :
                        nonMemberCart ? nonMemberCart.length : 0
                    }</a>
                </Link>
            }
            {
                me ?
                    <div className="profile__container">
                        <div className="signin-id">
                            {me.signinId == 'admin' ?
                                <Link href="/user/UserInfo">
                                    <a className="header__menu">
                                        {me?.signinId || me}
                                    </a>
                                </Link>
                                :
                                <a className="header__menu">
                                    {me?.signinId || me}
                                </a>
                            }
                        </div>
                        {me?.signinId || me ?
                            <div className="sign-out__button" onClick={onLogout}>로그아웃</div> :
                            ''
                        }
                    </div>
                    :
                    <div className="signin__container">
                        <div onClick={pagePath != "/SignUpForm" && onLoginClick}><a className="signin__button">로그인</a></div>
                    </div>
            }
            <div className={dark == true ? 'darkmode-button__container active' : 'darkmode-button__container'} onClick={onClickDarkMode}>
                <span></span>
                <div className="darkmode__day-button"></div>
                <div className="darkmode__night-button"></div>
            </div>
        </section>
    );
};

export default Header;