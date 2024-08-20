<template>
	<view class="box">
		<u-top-tips ref="uTips"></u-top-tips>
		<!-- 选择时间 -->
		<u-picker v-model="show_time" mode="time" :params="params" @confirm='confirm_the_time'></u-picker>

		<!-- 选择事件 -->
		<u-picker v-model="show_step" mode="selector" :range="selector" @confirm='confirm_the_step'></u-picker>



		<view class="Customer">
			<view class="Customer_Top">
				原打卡信息
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					事件
				</view>
				<view class="Mini_list_right">
					{{oldData.StateStr}}
				</view>
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					时间
				</view>
				<view class="Mini_list_right">
					{{oldData.CreateDate}}
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					地址
				</view>
				<view class="Mini_list_right">
					{{oldData.Address}}
				</view>
			</view>
			
			<view class="Mini_list" v-if="oldData.State == 2">
				<view class="Mini_list_left">
					距离
				</view>
				<view class="Mini_list_right">
					{{oldData.Len}}
				</view>
			</view>
			
		</view>


		<view class="Customer">
			<view class="Customer_Top">
				新打卡信息
			</view>

			<view class="Mini_list" @tap="show_step = true">
				<view class="Mini_list_left">
					事件
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					{{newItem.Position || '选择'}}
				</view>
			</view>

			<view class="Mini_list" @tap="show_time = true">
				<view class="Mini_list_left">
					时间
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					{{newItem.NewDt || '选择'}}
				</view>
			</view>

			<view class="Mini_list" @tap="getip()">
				<view class="Mini_list_left">
					地址
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					{{newItem.Address || '选择'}}
				</view>
			</view>
			
			<view class="Mini_list"  v-if="oldData.State == 2">
				<view class="Mini_list_left">
					距离
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					<input v-model="newItem.ShiJiLen" type="number" style="font-size: 12px; color: #2979ff; height: 40px;" />
				</view>
			</view>
		</view>





		<view class="Customer">
			<view class="Customer_Top">
				原因
			</view>

			<u-input v-model="newItem.Reason" type="textarea" :border="true" />
		</view>


		<u-button type="primary" size="medium" style="float:right;margin-right: 10px;margin-top: 20px;"
			@tap='primary()'>确认修改</u-button>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				oldData: {},

				show_time: false,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false
				},


				show_step: false,
				selector: [
					'途中/酒店',
					'家/公司',
					'工作现场'
				],

				newItem: {
					SRCDId: '', //[打卡明细ID]，
					Step: '', //[步骤]，
					NewDt: '', //[新时间]，
					Address: '', //[新地址],
					Position: '', //[新地址标识],
					Coordinate: '', //[新地址坐标],
					Reason: '', //[原因]
					ShiJiLen:0,//距离
				},

			};
		},
		created() {
			let Data = this.$store.state.punch_information
			this.oldData = Data
			console.log(Data)
			this.newItem.SRCDId = Data.Id
			this.newItem.Step = Data.Step

			this.newItem.Position = Data.StateStr
			this.newItem.NewDt = Data.CreateDate
			this.newItem.Address = Data.Address
			this.newItem.Coordinate = Data.Coordinate
			this.newItem.ShiJiLen = Data.Len
			// 1、长按打卡明细，弹出更改打卡信息框
			// 接口：UpdateSRCDDt，

			// 参数：
			// SRCDId[打卡明细ID]，
			// Step[步骤]，
			// NewDt[新时间]，
			// Address[新地址],
			// Position[新地址标识],
			// Coordinate[新地址坐标],
			// Reason[原因]

		},
		methods: {
			// 修改时间
			confirm_the_time({
				year,
				month,
				day,
				hour,
				minute
			}) {
				let time = year + '/' + month + '/' + day + ' ' + hour + ':' + minute
				this.newItem.NewDt = time
				console.log(time)
			},
			// 修改事件
			confirm_the_step(str) {
				this.newItem.Position = this.selector[str[0]]
			},
			//修改定位
			getip() {
				var my = this
				uni.chooseLocation({
					success: function(res) {
						my.newItem.Address = res.address
						my.newItem.Coordinate = res.latitude + ',' + res.longitude
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			// 确认修改
			primary() {

				if (!this.newItem.Position) {
					this.$refs.uTips.show({
						title: '请选择事件',
						type: 'warning',
						duration: '2300'
					})
					return false
				}

				if (!this.newItem.NewDt) {
					this.$refs.uTips.show({
						title: '请选择时间',
						type: 'warning',
						duration: '2300'
					})
					return false
				}


				if (!this.newItem.Address) {
					this.$refs.uTips.show({
						title: '请选择地点',
						type: 'warning',
						duration: '2300'
					})
					return false
				}

				if (!this.newItem.Reason) {
					this.$refs.uTips.show({
						title: '请输入原因',
						type: 'warning',
						duration: '2300'
					})
					return false
				}
				
				if (this.oldData.State == 2 && this.newItem.ShiJiLen.toString().trim() == '') {
					this.$refs.uTips.show({
						title: '请输入距离',
						type: 'warning',
						duration: '2300'
					})
					return false
				}

				console.log(this.newItem)

				var obj = {
					url: 'SRClock/UpdateSRCDDt',
					method: 'post',
					data: this.newItem,
				}

				this.$http(obj)
					.then((res) => {
						console.log(res)
						if (res.Code == 0) {
							uni.navigateTo({
								url: '../orderDetails/OKorder'
							});
						}
					})
					.catch((res) => {
						console.log(res)
					})
			}
		}
	}
</script>

<style lang="scss">
	.box {
		h3 {
			line-height: 40px;
		}




		.Customer {
			width: 100%;
			min-height: 50px;
			background-color: #FFFFFF;
			margin-bottom: 10px;

			.But_RTcjmi {
				width: 100%;
				min-height: 30px;
				padding: 10px;
				box-sizing: border-box;
				display: flex;
				justify-content: safe center;
				align-self: safe center;
				flex-wrap: wrap;
			}


			.Customer_Top {
				width: 100%;
				height: 40px;
				border-bottom: 1px solid #c3c3c3;
				line-height: 40px;
				padding-left: 20px;
				font-weight: bold;
				box-sizing: border-box;
			}

			.Mini_list {
				width: 100%;
				min-height: 40px;
				line-height: 40px;
				// padding-left: 25%;
				box-sizing: border-box;
				position: relative;

				.Mini_list_left {
					width: 30%;
					height: 100%;
					font-weight: bold;
					font-size: 12px;
					color: #555555;
					position: absolute;
					top: 0;
					left: 20px;
				}

				.Mini_list_right {
					width: 70%;
					min-height: 100%;
					color: #808080;
					padding-right: 20px;
					box-sizing: border-box;
					font-size: 12px;
					margin-left: 30%;
					word-wrap: break-word;
					word-break: break-all;
				}

				.But {
					position: absolute;
					right: 5%;
					top: 0px;
				}
			}
		}

	}
</style>