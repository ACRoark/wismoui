module.exports = {
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    ['import', { libraryName: 'antd', style: true }],
    'react-hot-loader/babel',
  ],
  presets: ['@babel/preset-env', '@babel/preset-modules', '@babel/preset-react', '@babel/preset-typescript'],
};
