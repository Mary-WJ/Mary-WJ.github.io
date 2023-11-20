const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Import the plugin

module.exports = {
  mode: 'development',
  entry: './src/app.js', // Your main JavaScript entry point
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/, // For CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader'] // Use MiniCssExtractPlugin loader here
      },
      // Add additional rules for other file types if necessary
    ]
  },
  plugins: [
    // Instantiate the plugin with options
    new MiniCssExtractPlugin({
      filename: '[name].css', // Output CSS file name pattern
    }),
    // Set up HtmlWebpackPlugin instances for each HTML file
    new HtmlWebpackPlugin({
      template: './apps/index.html',
      filename: 'index.html'
    }),
    new HtmlWebpackPlugin({
      template: './apps/contact.html',
      filename: 'contact.html'
    }),
    new HtmlWebpackPlugin({
      template: './login.html',
      filename: 'login.html'
    }),
    new HtmlWebpackPlugin({
      template: './apps/project.html',
      filename: 'project.html'
    }),
    new HtmlWebpackPlugin({
      template: './signup.html',
      filename: 'signup.html'
    }),
    new HtmlWebpackPlugin({
      template: './apps/skill.html',
      filename: 'skill.html'
    }),
    
  ],
  
};

