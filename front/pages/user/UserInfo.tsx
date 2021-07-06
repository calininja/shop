import * as React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import wrapper from '../../store/store';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import { loadUser } from '../../store/thunks';
import { selectUsers } from '../../store/selectors/user';
import { css } from '@emotion/react';

const UserInfo = () => {

    const { me } = useSelector(selectUsers());

    return (
        <section css={userInfoContainer}>
            {me?.signinId == "admin" ?
                <div>
                    <Link href="/admin/PostForm"><a><button>등록</button></a></Link>
                    <Link href="/admin/DeleteForm"><a><button>삭제</button></a></Link>
                </div>
                :
                ''}
        </section>
    );
};

const userInfoContainer = css`
    padding: 100px 0 0;
    >div{
        text-align: center;
        a{
            display: inline-block;
            margin: 0 5px;
        }
    }
`

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context: any) => {
    const state = await context.store.getState();
    const cookie = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) axios.defaults.headers.Cookie = cookie;
    if (!state.users.me) await context.store.dispatch(loadUser());

    return {
        props: {
            pathname: "/PostForm",
        }
    };
}
);

export default connect(state => state)(UserInfo);
