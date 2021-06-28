import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import wrapper from "store";
import { connect } from 'react-redux';
import { loadUser } from 'thunks';

const AboutContainer: React.FunctionComponent = () => {

    return (
        <section className="about__container">

            <div className="about__us">
                <h2>
                    About Us
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Id pariatur, blanditiis corrupti reprehenderit veritatis cupiditate. Earum odit,
                    facere mollitia aliquam commodi provident reiciendis dolorem et,
                    asperiores dignissimos sequi aut necessitatibus?
                </p>
            </div>
            <div className="about__contact">
                <h3>Contact</h3>
                <div>
                    <span>
                        email: <em>qwerty@gmail.com</em>
                    </span>
                    <span>
                        github: <em>https://github.com/qwerty</em>
                    </span>
                </div>
            </div>
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
            pathname: "/AboutContainer",
        }
    };
}
);

export default connect(state => state)(AboutContainer);