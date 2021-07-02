import React from 'react';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import wrapper from "store";
import { connect } from 'react-redux';
import { loadUser } from 'thunks';
import { font } from 'lib/styles/common';
import { css } from '@emotion/react';

const AboutContainer: React.FunctionComponent = () => {

    return (
        <section css={aboutContainer}>

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

const aboutContainer = css`
    background: #ffffff;
    margin: 100px auto;
    h2, h3, p, span, em{
        color: #111111;
    }
    h2, h3, p{
        font: 500 16px/16px ${font.noto};
        text-align: center;
    }
    p, span{
        display: block;
        font: 400 14px/21px ${font.noto};
        white-space: pre-line;
        text-align: center;
        em{
            font-weight: 500;
        }
    }
    >div{
        width: 700px;
        margin: 0 auto;
        @media screen and (max-device-width: 414px) {
            padding: 0 1rem;
            width: auto;
        }
    }
    .about__us{
        p{
            margin: 20px 0;
        }
    }
    .about__contact{
        >div{
            margin: 20px 0;
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
            pathname: "/AboutContainer",
        }
    };
});

export default connect(state => state)(AboutContainer);