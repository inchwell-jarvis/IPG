import Vue from 'vue'
import App from './App'


import utils from './utils.js' // 封装function 方法
Vue.use(utils) // 添加


import uView from "uview-ui";
Vue.use(uView);

Vue.config.productionTip = false
App.mpType = 'app'


import http from 'unihttp/index.js'
Vue.prototype.$http = http

import httpNO from 'unihttp/indexNoToken.js'
Vue.prototype.$uniwebno = httpNO

//引入vuex
import store from './store'
//把vuex定义成全局组件
Vue.prototype.$store = store


// 复制
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)



Vue.config.productionTip = false




const app = new Vue({
	...App
	// store
})
app.$mount()