
import { defineStore } from 'pinia'
import Taro from '@tarojs/taro'
import {getMenuButtonBoundingClientRect} from '@/utils/app'

export default defineStore('nav',{
  state:()=>{
    return {
      customNavInfo: {}, // 自定义nav信息
    }
  },
  getters: {
    navbarHeight:(state)=>state.customNavInfo.navbarHeight || 0,
    navbarTitleHeight:(state)=>state.customNavInfo.titleHeight || 0,
    navbarPaddingTop (state, getters) {
      console.log(getters,'==getters')
      return getters.navbarHeight - getters.navbarTitleHeight
    }
  },
  actions:{
    setNavInfo (payload) {
      this.customNavInfo = payload
    }, 
    async getNavInfo(){
      let customNavInfo = Taro.getStorageSync('customNavInfo')
      if (customNavInfo) {
        this.customNavInfo = customNavInfo
      } else {
        const clientRect = await getMenuButtonBoundingClientRect() // 胶囊位置信息
        const systemInfo = Taro.getSystemInfoSync()
        const statusBarHeight = systemInfo.statusBarHeight // 状态栏高度
        const computedClientRect = {
          // 胶囊实际位置，坐标信息不是左上角原点
          height: clientRect.height,
          width: clientRect.width,
          top: clientRect.top - statusBarHeight,
          bottom: clientRect.bottom - clientRect.height - statusBarHeight,
          right: systemInfo.windowWidth - clientRect.right
        }
        customNavInfo = {
          clientRect,
          statusBarHeight,
          titleHeight: computedClientRect.height + computedClientRect.top + computedClientRect.bottom,
          navbarHeight: clientRect.bottom + computedClientRect.bottom,
          navbarBtn: computedClientRect,
          navbarBoxHeight: (clientRect.bottom + computedClientRect.bottom + computedClientRect.bottom) / 2
        }
        this.customNavInfo = customNavInfo
        Taro.setStorageSync('customNavInfo', customNavInfo)
      }
    }
  }
})
