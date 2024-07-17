import { defineStore } from 'pinia'
import { getScene,getPhoneSystemInfo}  from '@/utils/app'

export default defineStore('app',{
  state:()=>{
    return {
      systemInfo: {}, // 设备信息
      isIOS: false, // 是否是ios
      isIOSFullScreen: false, // 是否是ios全面屏
      scene: '', // 当前小程序场景值
      windowHeight: '', // 设备高度
      windowWidth: '' // 设备宽度
    }
  },
  getters: {
  },
  actions:{
    //获取当前小程序场景值
    async getAppScene () {
      this.scene = getScene()
    }, 
    // 获取当前手机型号以及是否是iOS全面屏
    getPhoneSystemInfo(){
      const phoneSystemInfo = getPhoneSystemInfo()
      this.systemInfo = phoneSystemInfo.systemInfo
      this.isIOS = phoneSystemInfo.isIOS
      this.isIOSFullScreen = phoneSystemInfo.isIOSFullScreen
      this.windowHeight = phoneSystemInfo.windowHeight
      this.windowWidth = phoneSystemInfo.windowWidth
    }
  }
})
