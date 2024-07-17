import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { checkNetwork, updateApp } from '@/utils/app'
import { useAppStore,useNavStore } from '@/stores/index'
import './app.scss'

const App = createApp({
  onLaunch(){
    // 检测网络
    checkNetwork()
    // 检查版本更新
    updateApp()
  },
  onShow(options) {
    console.log(options,'==options')
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

App.use(createPinia())
console.log(useAppStore(),'==useAppStore()')

// 获取小程序当前场景值
useAppStore().getAppScene()
// 获取当前手机型号以及是否是iOS全面屏
useAppStore().getPhoneSystemInfo()
// 获取顶部胶囊信息
useNavStore().getNavInfo()

export default App
