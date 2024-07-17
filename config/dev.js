
// const API_HOST = '"xxx"'
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  env: {
    NODE_ENV: '"development"'
  },
  defineConstants: {
    // API_HOST
  },
  plugins: [
  ],
  mini: {
    webpackChain: (chain) => {
      chain.plugin('analyzer').use(BundleAnalyzerPlugin),
      chain.merge({
        plugin: {
          // 解决包体积过大无法进行预览的问题
          terse: {
            plugin: TerserPlugin,
            args: [
              {
                test: /\.js(\?.*)?$/i,
                minify: TerserPlugin.swcMinify,
                parallel: true,
                terserOptions: {
                  compress: true,
                  sourceMap: true, 
                },
              }
            ]
          }
        }
      })
    }
  },
  h5: {
    /**
     * 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
     */
    webpackChain (chain) {
      chain.plugin('analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [
          {
            openAnalyzer: true,  // 开启默认浏览器并展示报告
            analyzerMode: 'static',//生成报告的模式
            generateStatsFile: true, // 生成 stats.json 文件
            statsFilename: 'stats.json',// stats.json 文件的输出路径
            reportFilename: 'report.html', // 报告的HTML文件名和输出路径
            defaultSizes: 'parsed',// 模块大小的默认显示单位
            showSources: true, // 是否显示模块的来源
            showAssets: true,// 是否在报告中显示资产
            reportTitle: 'My App Bundle Analysis',// 自定义报告网页标题
          },
        ]);
    }
  }
}



