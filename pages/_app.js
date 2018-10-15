import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import Link from '../components/Link';
import { description } from '../package.json';

const faviconSizes = [32, 57, 72, 96, 120, 128, 144, 152, 195, 228];

const ExtendedLink = styled(Link)`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 2rem;
  font-size: 1.6rem;
`;

const GlobalStyles = createGlobalStyle`
  @import url('https://mcan.sh/assets/fonts/Gotham/gotham.css');

  html {
    box-sizing: border-box;
    font-size: 10px;
  }

  *,
  *::before,
  *::after {
    margin: 0;
    box-sizing: inherit;
    font-weight: 300;
  }

  body {
    min-height: 100vh;
    font-family: 'Gotham Pro';
    background: #222;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 1.35;
    text-align: center;
    margin: 0;
  }
`;

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  };

  componentDidMount = () => {
    if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(() => {
          console.log('service worker registration successful');
        })
        .catch(err => {
          console.warn('service worker registration failed', err);
        });
    }
  };

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <>
          <Head>
            <title>Chargin</title>
            <meta charSet="utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width, viewport-fit=cover"
            />
            <link rel="manifest" href="/manifest.json" />
            <meta name="description" content={description} />
            {faviconSizes.map(favicon => (
              <link
                rel="apple-touch-icon-precomposed"
                sizes={`${favicon}x${favicon}`}
                href={`/static/favicon-${favicon}.png`}
              />
            ))}
          </Head>
          <GlobalStyles />
          <Component {...pageProps} />
          <ExtendedLink
            href="https://github.com/mcansh/chargin"
            target="_blank"
          >
            src
          </ExtendedLink>
        </>
      </Container>
    );
  }
}

export default MyApp;
