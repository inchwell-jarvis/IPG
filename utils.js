import getLocation from './utils/getLocation.js'
import apix from './utils/apix'
import format_price from './utils/format_price.js'

export default {
	install(Vue, options) {

		// 获取定位信息
		Vue.prototype.getLocation = getLocation
		// 封装apx请求
		Vue.prototype.apix = apix
		// 格式化金额
		Vue.prototype.format_price = format_price
	}
};