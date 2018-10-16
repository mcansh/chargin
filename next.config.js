// Native
const fs = require('fs');
const { join } = require('path');
const { promisify } = require('util');

// Packages
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const { name } = require('./package.json');

const copyFile = promisify(fs.copyFile);

const staticFilesToCopy = [
  'favicon.ico',
  'favicon.png',
  'manifest.json',
  'sw.js',
];

module.exports = {
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir }) {
    if (dev) return defaultPathMap;
    await Promise.all(
      staticFilesToCopy.map(file => {
        if (file === 'sw.js') {
          return copyFile(join(distDir, file), join(outDir, file));
        }
        return copyFile(join(dir, file), join(outDir, file));
      })
    );
    return defaultPathMap;
  },
  webpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new SWPrecacheWebpackPlugin({
          cacheId: name,
          filename: 'sw.js',
          minify: true,
          staticFileGlobs: [
            'static/**/*', // Precache all static files by default
          ],
          staticFileGlobsIgnorePatterns: [/\.next\//],
          runtimeCaching: [
            {
              handler: 'networkFirst',
              urlPattern: /^https?.*/,
            },
          ],
        })
      );
    }
    return config;
  },
};
