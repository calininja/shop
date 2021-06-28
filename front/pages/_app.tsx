import * as React from 'react';
import { NextComponentType } from "next"
import { AppContext, AppInitialProps, AppProps } from "next/app";
import Helmet from "react-helmet";
import wrapper from "store";
import Applayout from "../components/Applayout";
import Core from 'components/base/Core';
import '../assets/scss/index.scss';

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
      <Applayout pagePath={pagePath} >
        <Component {...pageProps} pageProps={pageProps} />
      </Applayout>
      <Core />
    </>
  )
};

export default wrapper.withRedux(App);

