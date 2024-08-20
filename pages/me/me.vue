<template>
	<view class="box">
		<u-top-tips ref="uTips"></u-top-tips>

		<u-cell-group>
			<u-cell-item icon="setting-fill" title="系统设置" :arrow='false'></u-cell-item>
			<u-cell-item icon="reload" title="检查更新" :arrow='false' @tap='VerifyVersion()'></u-cell-item>
			<u-cell-item icon="hourglass-half-fill" :title="$store.state.development" :arrow='false'></u-cell-item>
		</u-cell-group>

		<u-button class='but' type="error" @tap='TClogin()'>退出登录</u-button>

		<u-modal v-model="show" :content="content" @confirm='Gx()' @cancel='show = false'
			:show-cancel-button='true'></u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				content: "检测到新版本！是否前往更新?"
			};
		},
		methods: {
			TClogin: function() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			VerifyVersion: function() {
				const My = this
				console.log(My.$store.state.currentVersion)


				var obj = {
					url: 'SRClock/VerifyVersion',
					method: 'get',
					data: {
						currentver: My.$store.state.currentVersion
					},
				}

				My.$http(obj)
					.then((res) => {
						console.log(res)
						if (res.Data) {
							this.show = true


						} else {
							this.$refs.uTips.show({
								title: '当前为最新版本!',
								type: 'success',
								duration: '2300'
							})
						}
					})
					.catch((res) => {
						console.log(res)
					})
			},
			// 更新
			Gx: function() {
				var urlStr = encodeURI(
					'https://fast.ipgbeijing.com/Content/package/downloadgcsApp.html')
				plus.runtime.openURL(urlStr)
			}
		}
	}
</script>

<style lang="scss">
	.box {
		position: relative;

		.but {
			width: 80%;
			position: fixed;
			bottom: 50px;
			right: 0;
			left: 0;
			margin: auto;
		}
	}
</style>