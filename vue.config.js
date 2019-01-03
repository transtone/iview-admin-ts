const PrerenderSpaPlugin = require('prerender-spa-plugin')
const path = require('path')
const webpack = require('webpack')
const child = require('child_process')
// 获取当前分支commit
const commitHash = child.execSync('git rev-parse HEAD').toString()

module.exports = {
  pages: {
    index: {
      entry: 'src/main.js',
      template:
        process.env.NODE_ENV === 'production'
          ? 'public/index.html'
          : 'public/index_dev.html'
    }
  },
  productionSourceMap: false,
  parallel: require('os').cpus().length > 1,
  devServer: {
    open: false,
    host: '0.0.0.0',
    port: 7031,
    disableHostCheck: true,
    https: false,
    hotOnly: true,
    proxy: null,
    before: app => {}
  },
  configureWebpack: {
    plugins: plugins()
  }
}

function plugins() {
  if (process.env.NODE_ENV === 'production') {
    return [
      new webpack.DefinePlugin({
        _COMMIT_HASH__: JSON.stringify(commitHash)
      }),
      new PrerenderSpaPlugin({
        staticDir: path.join(__dirname, 'dist'),
        routes: ['/', '/about']
      })
    ]
  }
  return [
    new webpack.DefinePlugin({
      _COMMIT_HASH__: JSON.stringify(commitHash)
    })
  ]
}
