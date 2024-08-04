const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const { SourceMapDevToolPlugin } = require("webpack");
const port = process.env.PORT || 3010;


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
    publicPath: "/",
  },
  devServer: {
    port: port,
    historyApiFallback: true,
    allowedHosts: "all",
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
        Registration: `Registration@https://registration.micple.com/remoteEntry.js`,
        Profile: `Profile@https://profile.micple.com/remoteEntry.js`,
        Watch: `Watch@https://watch.micple.com/remoteEntry.js`,
        Store: `Store@https://store.micple.com/remoteEntry.js`,
        Campaigns: `Campaigns@https://campaign.micple.com/remoteEntry.js`,
        Shortener: `Shortener@https://shortener.micple.com/remoteEntry.js`,
        Locker: `Locker@https://locker.micple.com/remoteEntry.js`,
        Investor: `Investor@https://investor.micple.com/remoteEntry.js`,
        Mail: `Mail@https://mail.micple.com/remoteEntry.js`,
        Notifications: `Notifications@https://notification.micple.com/remoteEntry.js`,
        Messenger: `Messenger@https://messanger.micple.com/remoteEntry.js`,
        Search: `Search@https://insearch.micple.com/remoteEntry.js`,
        Balance: `Balance@https://balance.micple.com/remoteEntry.js`,

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
