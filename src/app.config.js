export default {
  pages: [
    'pages/index/index',
    'pages/no-network/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  networkTimeout: {
    request: 10000,
    downloadFile: 300000
  }
}
