import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class Page extends Document {
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
          <meta
            name="description"
            content="a fun little project to show whether your computer is charging or not 😜"
          />
          <link rel="manifest" href="/static/manifest.json" />
          <link
            rel="shortcut icon"
            href="/static/favicon-32.png"
            sizes="32x32"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="228x228"
            href="/static/favicon-228.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="195x195"
            href="/static/favicon-195.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="152x152"
            href="/static/favicon-152.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="144x144"
            href="/static/favicon-144.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="128x128"
            href="/static/favicon-128.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="120x120"
            href="/static/favicon-120.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="96x96"
            href="/static/favicon-96.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            sizes="72x72"
            href="/static/favicon-72.png"
          />
          <link
            rel="apple-touch-icon-precomposed"
            href="/static/favicon-57.png"
          />
        </Head>
        <style jsx global>{`
          @import url('https://mcan.sh/assets/fonts/Gotham/gotham.css');
          * {
            margin: 0;
            box-sizing: border-box;
            font-weight: 300;
          }
          body {
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
