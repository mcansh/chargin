import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Head from 'next/head';
import GlobalStyles from './GlobalStyles';
import Link from './Link';
import { description } from '../package.json';

const faviconSizes = [32, 57, 72, 96, 120, 128, 144, 152, 195, 228];

const BottomLink = styled(Link)`
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 2rem;
  font-size: 1.6rem;
`;

class Page extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
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
    const { children } = this.props;
    return (
      <div>
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
              key={favicon}
              rel="apple-touch-icon-precomposed"
              sizes={`${favicon}x${favicon}`}
              href={`/static/favicon-${favicon}.png`}
            />
          ))}
        </Head>
        <GlobalStyles />
        {children}
        <BottomLink href="https://github.com/mcansh/chargin" target="_blank">
          src
        </BottomLink>
      </div>
    );
  }
}

export default Page;
