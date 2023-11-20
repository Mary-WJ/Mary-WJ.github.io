// const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // Import the plugin

// module.exports = {
//   mode: 'development',
//   entry: './src/app.js', // Your main JavaScript entry point
//   output: {
//     path: path.resolve(__dirname, 'docs'),
//     filename: 'bundle.js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.css$/, // For CSS files
//         use: [MiniCssExtractPlugin.loader, 'css-loader'] // Use MiniCssExtractPlugin loader here
//       },
//       // Add additional rules for other file types if necessary
//     ]
//   },
//   plugins: [
//     // Instantiate the plugin with options
//     new MiniCssExtractPlugin({
//       filename: '[name].css', // Output CSS file name pattern
//     }),
//     // Set up HtmlWebpackPlugin instances for each HTML file
//     new HtmlWebpackPlugin({
//       template: './apps/index.html',
//       filename: 'index.html'
//     }),
//     new HtmlWebpackPlugin({
//       template: './apps/contact.html',
//       filename: 'contact.html'
//     }),
//     new HtmlWebpackPlugin({
//       template: './apps/login.html',
//       filename: 'login.html'
//     }),
//     new HtmlWebpackPlugin({
//       template: './apps/project.html',
//       filename: 'project.html'
//     }),
//     new HtmlWebpackPlugin({
//       template: './apps/signup.html',
//       filename: 'signup.html'
//     }),
//     new HtmlWebpackPlugin({
//       template: './apps/skill.html',
//       filename: 'skill.html'
//     }),
    
//   ],
  
// };



const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js', // Your main JavaScript entry point
    side: './src/side.js' // side.js as a separate entry point
  },
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: '[name].bundle.js' // This will output app.bundle.js and side.bundle.js
  },
  module: {
    rules: [
      {
        test: /\.css$/, // For CSS files
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      // Add additional rules if necessary
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css', // This will output app.css and side.css if you have CSS imported in side.js
    }),
    // Setup HtmlWebpackPlugin for each HTML file
    new HtmlWebpackPlugin({
      template: './apps/index.html',
      filename: 'index.html',
      chunks: ['app', 'side'] // Include both app and side bundles
    }),
    new HtmlWebpackPlugin({
      template: './apps/contact.html',
      filename: 'contact.html',
      chunks: ['app', 'side'] // Include both app and side bundles
    }),
    // ... repeat for each of your other HTML files
    new HtmlWebpackPlugin({
      template: './apps/login.html',
      filename: 'login.html',
      chunks: ['app', 'side'] // Include both app and side bundles
    }),
    new HtmlWebpackPlugin({
      template: './apps/project.html',
      filename: 'project.html',
      chunks: ['app', 'side'] // Include both app and side bundles
    }),
    new HtmlWebpackPlugin({
      template: './apps/signup.html',
      filename: 'signup.html',
      chunks: ['app', 'side'] // Include both app and side bundles
    }),
    new HtmlWebpackPlugin({
      template: './apps/skill.html',
      filename: 'skill.html',
      chunks: ['app', 'side'] // Include both app and side bundles
    }),
    // ... continue for any other HTML files
  ],
};
