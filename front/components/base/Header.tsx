import * as React from 'react';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUsers } from '../../store/selectors/user';
import { selectOrders } from '../../store/selectors/order';
import { signOutUser } from '../../store/thunks';
import { loadCart } from '../../store/thunks/orders';
import { showModal } from '../../store/slices/cores';
import Link from 'next/link';
import { css } from '@emotion/react';
import { font } from '../../lib/styles/common';
import media from '../../lib/styles/media';

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
    const { orders } = useSelector(selectOrders());
    const id = me && orders ? orders.length : orders.length;

    const onLogout = useCallback(() => {
        dispatch(signOutUser());
        dispatch(loadCart(null));
    }, [])

    const onLogin = () => dispatch(showModal({ visible: true, mode: 'LOGIN' }));

    return (
        <section css={headerContainer} className='header__container'>
            <Link href="/"><a className="header__menu">HOME</a></Link>
            <Link href="/shop/list/CategoryAll"><a className="header__menu">SHOP</a></Link>
            <Link href="/about"><a className="header__menu">ABOUT</a></Link>
            {
                <Link
                    href={'/cart'}
                    as={'/cart'}
                    key={id}
                >
                    <a className="header__cart header__menu">{me ? orders.length : 0}</a>
                </Link>
            }
            {
                me ?
                    <div className="header__profile">
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
                    <div className="header__signin">
                        <div onClick={pagePath != "/SignUpForm" && onLogin}><a className="signin__button">로그인</a></div>
                    </div>
            }
            <div className={dark == true ? 'header__darkmode active' : 'header__darkmode'} onClick={onClickDarkMode}>
                <span></span>
                <div className="darkmode__day"></div>
                <div className="darkmode__night"></div>
            </div>
        </section>
    );
};

const headerContainer = css`
    display: flex;
    justify-content: center;
    width: 100%;
    background: var(--background1);
    &.fixed{
        position: fixed;
        z-index: 2;
    }
    .header__darkmode {
        position: relative;
        top: 1rem;
        width: 2.1rem;
        height: 1.1rem;
        border-radius: 50px;
        overflow: hidden;
        box-sizing: border-box;
        border: 1px solid #cccccc;
        background-color: #cccccc;
        &.active{
            background-color: #5be75b;
            span{
                left: auto;
                right:0;
            }
        }
        >span{
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            width: 1rem;
            height: 100%;
            border: none;
            border-radius: 50%;
            background-color: #ffffff;
            transition: all 1s;
            z-index: 1;
        }
        .darkmode__day,
        .darkmode__night{
            display: inline-block;
            position: relative;
            width: 50%;
            height: 100%;
            text-align: center;
            vertical-align: middle;
            z-index: 0;
            &::after{
                display: block;
                content: '';
                clear: both;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
            }
        }
    }
    a.header__menu{
        display: inline-block;
        margin: 15px;
        letter-spacing: 1px;
        opacity: 0.8;
        color: var(--color1);
        font: 400 12px/15px ${font.noto};
        &:hover{
            color: var(--color1);
            opacity: 1;
            transition: all 0.3s;
        }
        ${media.small} {
            margin: 10px;
        }
        &:last-child{
            ${media.large} {
                margin: 10px 0 0 0;
            }
        }
    }
    a.header__cart{
        position: relative;
        width: auto;
        min-width: 13px;
        height: 13px;
        text-align: center;
        padding: 2px 3px;
        line-height: 12px;
        border: 1px solid var(--color1);
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
        text-indent: 1px;
        z-index: 2;
        &::before{
            content: '';
            clear: both;
            display: block;
            width: 10px;
            height: 3px;
            position: absolute;
            top: -5px;
            left: 50%;
            transform: translateX(-50%);
            border: inherit;
            border-top-right-radius: 2.5px;
            border-top-left-radius: 2.5px;
            z-index: -1;
        }
    }
    .header__signin{
        z-index: 2;
        .signin__button{
            display: inline-block;
            margin: 15px;
            font: 300 12px/15px ${font.noto};
            color: var(--color1);
            cursor: pointer;
        }
    }
    .header__profile{
        text-align: center;
        .signin-id, .sign-out__button{
            display: inline-block;
            margin: 15px;
            font: 400 12px/15px ${font.noto};
            color: var(--color1);
        }
        .signin-id{
            a{
                margin: 0;
            }
        }
        .sign-out__button{
            color: var(--color1);
            cursor: pointer;
        }
        ${media.large} {
            margin: 10px 0;
            .signin-id, .sign-out__button{
                display: block;
                margin: 5px;
            }
        }
    }
`

export default Header;