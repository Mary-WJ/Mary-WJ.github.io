const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js', // Your main JavaScript entry point
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // For CSS files
        use: ['style-loader', 'css-loader'] // To process CSS files
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './apps/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './apps/contact.html',
      filename: 'contact.html'
    }),
    new HtmlWebpackPlugin({
      template: './apps/login.html',
      filename: 'login.html'
    }),
    new HtmlWebpackPlugin({
      template: './apps/project.html',
      filename: 'project.html'
    }),
    new HtmlWebpackPlugin({
      template: './apps/signup.html',
      filename: 'signup.html'
    }),
    new HtmlWebpackPlugin({
      template: './apps/skill.html',
      filename: 'skill.html'
    }),
  ],
  
};
