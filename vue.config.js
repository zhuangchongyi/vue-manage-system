 const path = require('path');

 function resolve(dir) {
   return path.join(__dirname, dir);
 }

 module.exports = {
   publicPath: "/", //添加前缀
   assetsDir: './', //静态资源存放目录
   productionSourceMap: false, // 加速生产环境构建。
   devServer: {
     port: 8081, // 启动端口
     open: true, // 启动后是否自动打开网页
     //  proxy: {
     //    [process.env.VUE_APP_BASE_API]: {
     //      target: 'http://127.0.0.1:8090',
     //      changeOrigin: true,
     //      pathRewrite: {
     //        ['^' + process.env.VUE_APP_BASE_API]: ''
     //      }
     //    }
     //  }
   },
   configureWebpack: {
     name: process.env.VUE_APP_TITLE,
     resolve: {
       alias: {
         '@': resolve('src')
       }
     }
   },
   chainWebpack(config) {
     config.module
       .rule('svg')
       .exclude.add(resolve('src/icons'))
       .end();
     config.module
       .rule('icons')
       .test(/\.svg$/)
       .include.add(resolve('src/icons'))
       .end()
       .use('svg-sprite-loader')
       .loader('svg-sprite-loader')
       .options({
         symbolId: 'icon-[name]'
       })
       .end();
   }
 };