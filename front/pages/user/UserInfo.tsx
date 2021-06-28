import * as React from 'react';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import wrapper from 'store';
import { connect, useSelector } from 'react-redux';
import Link from 'next/link';
import { loadUser } from 'thunks';
import { selectUsers } from 'selectors/user';

const UserInfo = () => {

    const { me } = useSelector(selectUsers());
    const css: object = {
        'position': 'relatvie',
        'padding': 100 + 'px 0 0',
    }

    return (
        <section className="user-info__container" style={css}>
            {me?.signinId == "admin" ?
                <div className="admin-menu">
                    <Link href="/admin/PostForm"><a><button>등록</button></a></Link>
                    <Link href="/admin/DeleteForm"><a><button>삭제</button></a></Link>
                </div>
                :
                ''}
        </section>
    );
};

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
