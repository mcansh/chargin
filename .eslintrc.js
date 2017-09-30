module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    node: true,
  },
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'jsx-a11y/href-no-hash': 0,
    'no-unused-vars': [1, { argsIgnorePattern: 'res|next|^err' }],
    'arrow-body-style': [2, 'as-needed'],
    'no-console': 0,
  },
};
