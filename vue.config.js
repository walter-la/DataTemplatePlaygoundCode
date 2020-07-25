// vue.config.js
module.exports = {
    // options...
    runtimeCompiler: true,
    publicPath: process.env.VUE_APP_BASE_API,
    chainWebpack: config => {
        config
          .plugin('html')
          .tap(args => {
            args[0].title = 'Data Template Playgound by Walter-la'
            return args
          })
      }
}