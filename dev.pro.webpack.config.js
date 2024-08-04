const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { SourceMapDevToolPlugin } = require("webpack");
const path = require("path");

const deps = require("./package.json").dependencies;
module.exports = {
  mode: "production", 
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  }, 
  ignoreWarnings: [
    // Ignore warnings raised by source-map-loader.
    // some third party packages may ship miss-configured sourcemaps, that interrupts the build
    // See: https://github.com/facebook/create-react-app/discussions/11278#discussioncomment-1780169
    /**
     *
     * @param {import('webpack').WebpackError} warning
     * @returns {boolean}
     */
    function ignoreSourcemapsloaderWarnings(warning) {
      return (
        warning.module &&
        warning.module.resource.includes('node_modules') &&
        warning.details &&
        warning.details.includes('source-map-loader')
      );
    },
  ],
  output: {
    publicPath: '/'
  },
  devServer: {
    port: 3010,
    historyApiFallback: true,
    hot: true,
    static: {
      directory: path.join(__dirname, 'public'),
    },
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 20,
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|ogg|mp3)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              importLoaders: 3,
            },
          },
          {
            loader: "resolve-url-loader",
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
    new ModuleFederationPlugin({
      name: "Home",
      filename: "remoteEntry.js", 

      //   Connect to other project to main project
      remotes: {
        // Registration: `Registration@http://localhost:3011/remoteEntry.js`,
        
        // Registration: `Registration@https://micple.com:3011/remoteEntry.js`,
        Profile: `Profile@http://localhost:3012/remoteEntry.js`,
        Watch: `Watch@http://localhost:3013/remoteEntry.js`,
        Store: `Store@http://localhost:3014/remoteEntry.js`,
        Campaigns: `Campaigns@http://localhost:3025/remoteEntry.js`,
        Shortener: `Shortener@http://localhost:3016/remoteEntry.js`,
        Locker: `Locker@http://localhost:3017/remoteEntry.js`,
        Investor: `Investor@http://localhost:3018/remoteEntry.js`,
        Mail: `Mail@http://localhost:3019/remoteEntry.js`,
        Notifications: `Notifications@http://localhost:3020/remoteEntry.js`,
        Messenger: `Messenger@http://localhost:3021/remoteEntry.js`,
        Search: `Search@http://localhost:3022/remoteEntry.js`,
        Balance: `Balance@http://localhost:3035/remoteEntry.js`,

      },

      //   Other Project to main project
      // exposes: {
      //   "./Main": "/src/pages/home/index.js",
      // },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
