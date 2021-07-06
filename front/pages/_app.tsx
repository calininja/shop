import * as React from 'react';
import { NextComponentType } from "next"
import { AppContext, AppInitialProps, AppProps } from "next/app";
import Helmet from "react-helmet";
import wrapper from "../store/store";
import Applayout from "../components/base/Applayout";
import Core from '../components/base/Core';
import emotionReset from 'emotion-reset';
import { Global, css } from '@emotion/react';

const App: NextComponentType<AppContext, AppInitialProps, AppProps> = ({
  Component,
  pageProps
}) => {

  const pagePath = (pageProps?.pathname);

  const helmets = (
    <Helmet
      title="Shop"
      description="쇼핑몰"
      htmlAttributes={{ lang: "ko" }}
      meta={[
        {
          charset: "UTF-8",
        },
        {
          name: "viewport",
          content:
            "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=yes,viewport-fit=cover",
        },
        {
          "http-equiv": "X-UA-Compatible",
          content: "IE=edge",
        },
        {
          name: "description",
          content: "Shop",
        },
        {
          name: "og:title",
          content: "Shop",
        },
        {
          name: "og:description",
          content: "Shop",
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          property: "og:image",
          content: "http://calinode.com/favicon.ico",
        },
      ]}
      link={[
        {
          rel: "shortcut icon",
          href: "/favicon.ico",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&display=swap"
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css',
        },
        {
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css',
        }
      ]}
    />
  );

  return (
    <>
      {helmets}
      <Global styles={reset} />
      <Applayout pagePath={pagePath} >
        <Component {...pageProps} pageProps={pageProps} />
      </Applayout>
      <Core />
    </>
  )
};


const reset = css`
${emotionReset}
  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  a{
      text-decoration: none;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  :root{
      --background1: #ffffff;
      --background2: #ffffff;
      --color1: #000000;
      --revert: #ffffff;
  }
  :root[color-theme='light'] {
      --background: #ffffff;
      --color1: #000000;
  }
  :root[color-theme='dark'] {
      --background: rgba(0,0,0,0.8);
      --color1: #ffffff;
      --color2: #f5f5f7;
  }
  .darkmode{
      --background1: rgba(0,0,0,0.8);
      --background2: #2d3134;
      --color1: #ffffff;
      --color2: #f5f5f7;
      --revert: #000000;
  }
`
export default wrapper.withRedux(App);

