import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class Page extends Document {
  componentDidMount() {
    if (process.env.NODE_ENV === 'production') {
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker
          .register('/sw.js')
          .then(console.log('service worker registration successful')) // eslint-disable-line no-console
          .catch(err => console.warn(err)); // eslint-disable-line no-console
      }
    }
  }
  render() {
    return (
      <html lang="en">
        <Head>
          <title>Chargin</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width, viewport-fit=cover"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <meta name="description" content="a fun little project to show whether your computer is charging or not 😜" />
        </Head>
        <style jsx global>{`
          @import url('https://mcan.sh/assets/fonts/Gotham/gotham.css');
          * {
            margin: 0;
            box-sizing: border-box;
            font-weight: 300;
          }
          body {
            font-family: 'Roboto', sans-serif;
            background: #222;
            color: white;
            min-height: 100vh;
            font-family: 'Gotham Pro';
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 2rem;
            text-align: center;
            max-width: 800px;
            width: 90%;
            margin: 0 auto;
            line-height: 1.2;
          }
        `}</style>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default Page;
