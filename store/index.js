import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		// 从工单列表页传到  空白工单创建页  判断现在是否可以创建
		HaveInProgressID: '',
		// 加载动画
		loading: false,
		// 开发环境
		// development: 'DEV',
		development: 'PRO',
		// [PRO]   actionapi/SRClock/xxx
		// [DEV]   actionapi/SRClockTesting/xxx

	},
	mutations: {},
	actions: {},

})
export default store