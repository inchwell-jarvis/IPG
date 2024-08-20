<template>
	<view class="box">
		<u-top-tips ref="uTips"></u-top-tips>


		<!-- 选择时间 -->
		<u-picker v-model="show_time" mode="time" :params="params" @confirm='confirm_the_time'></u-picker>

		<!-- 选择事件 -->
		<u-picker v-model="show_step" mode="selector" :range="selector" @confirm='confirm_the_step'></u-picker>


		<view class="Customer">
			<view class="Customer_Top">
				出发信息
			</view>
			<view class="Mini_list" @tap="show_step = true,state = 0">
				<view class="Mini_list_left">
					事件
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					{{parame.LeavePosition || '选择'}}
				</view>
			</view>
			<view class="Mini_list" v-if="parame.LeavePosition == '工作现场'">
				<view class="Mini_list_left">
					是否完成任务
				</view>
				<view class="Mini_list_right">
					<u-radio-group v-model="parame.Complete2" @change="radioGroupChange">
						<u-radio name="完成">完成</u-radio>
						<u-radio name="未完成">未完成</u-radio>
					</u-radio-group>
				</view>
			</view>
			<view class="Mini_list" @tap="show_time = true,state = 0">
				<view class="Mini_list_left">
					时间
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					{{parame.LeaveDt || '选择'}}
				</view>
			</view>
			<view class="Mini_list" @tap="getip(),state = 0">
				<view class="Mini_list_left">
					地址
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					{{parame.LeaveAddress || '选择'}}
				</view>
			</view>
		</view>



		<view class="Customer">
			<view class="Customer_Top">
				到达信息
			</view>
			<view class="Mini_list" @tap="show_step = true,state = 1">
				<view class="Mini_list_left">
					事件
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					{{parame.ArrivePosition || '选择'}}
				</view>
			</view>
			<view class="Mini_list" @tap="show_time = true,state = 1">
				<view class="Mini_list_left">
					时间
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					{{parame.ArriveDt || '选择'}}
				</view>
			</view>
			<view class="Mini_list" @tap="getip(),state = 1">
				<view class="Mini_list_left">
					地址
				</view>
				<view class="Mini_list_right" style="color: #2979ff;">
					{{parame.ArriveAddress || '选择'}}
				</view>
			</view>
		</view>


		<view class="Customer">
			<view class="Customer_Top">
				距离
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					推荐距离
				</view>
				<view class="Mini_list_right">
					<u-input v-if="parame.TuiJianLen != '-'" v-model="parame.TuiJianLen" type="text" :border="true"
						style="width: 100px;border: none;float: left;" :disabled='true' />
					<span v-if="parame.TuiJianLen != '-'">km</span>
				</view>
			</view>
			<view class="Mini_list">
				<view class="Mini_list_left">
					实际距离
				</view>
				<view class="Mini_list_right">
					<u-input v-model="parame.ShiJiLen" type="number" :border="true"
						style="width: 100px;border: none;float: left;" placeholder='请输入数值' />
					<span>km</span>
				</view>
			</view>
		</view>

		<view class="Customer">
			<view class="Customer_Top">
				补充打卡原因
			</view>
			<u-input v-model="parame.UpdateReason" type="textarea" :border="true" />
		</view>


		<u-button type="primary" size="medium" style="float:right;margin-right: 10px;margin-top: 20px;"
			@tap='primary()'>补充打卡</u-button>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				parame: {
					// 接口： SupplySRCD， 参数：
					SRCId: '', //[打卡记录ID]

					Complete2: '未完成', // bool[是否完成任务]--
					Complete: false, // bool[是否完成任务]--

					LeaveAddress: '', //[出发地点]
					LeavePosition: '', //[出发地标识]
					LeaveCoordinate: '', //[出发地坐标]
					LeaveDt: '', //[出发时间]

					ArriveAddress: '', //[到达地址]
					ArrivePosition: '', //[到达地标识]
					ArriveCoordinate: '', //[到达地坐标]
					ArriveDt: '', //[到达时间]

					TuiJianLen: '-', //[推荐距离] 
					ShiJiLen: '', //[实际距离]
					UpdateReason: '', //[补充打卡原因]
				},



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

				state: 0,
			}
		},
		created() {
			this.parame.SRCId = this.$store.state.SRCId
		},
		methods: {
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				console.log(e);
				e == '完成' ? this.parame.Complete = true : this.parame.Complete = false
			},
			// 修改时间
			confirm_the_time({
				year,
				month,
				day,
				hour,
				minute
			}) {
				let time = year + '/' + month + '/' + day + ' ' + hour + ':' + minute
				this.state ? this.parame.ArriveDt = time : this.parame.LeaveDt = time
				console.log(time)
			},
			// 修改事件
			confirm_the_step(str) {
				this.state ? this.parame.ArrivePosition = this.selector[str[0]] : this.parame.LeavePosition = this
					.selector[str[0]]
			},
			//修改定位
			getip() {
				var my = this
				uni.chooseLocation({
					success: function(res) {
						if (my.state) {
							my.parame.ArriveAddress = res.address
							my.parame.ArriveCoordinate = res.latitude + ',' + res.longitude
						} else {
							my.parame.LeaveAddress = res.address
							my.parame.LeaveCoordinate = res.latitude + ',' + res.longitude
						}

						if (my.parame.ArriveCoordinate && my.parame.LeaveCoordinate) {
							my.BestMileageFUNCX()
						}

						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
					}
				});
			},
			// 

			// 计算最佳距离
			BestMileageFUNCX: function() {

				var My = this
				My.$refs.uTips.show({
					title: '正在尝试获取最佳距离！',
					type: 'success',
					duration: '2300'
				})
				var obj = {
					url: 'SRClock/GetBestMileage',
					method: 'get',
					data: {
						from: My.parame.LeaveCoordinate,
						to: My.parame.ArriveCoordinate
					}
				}
				My.$http(obj)
					.then((res) => {
						My.parame.TuiJianLen = res.Data
					})
			},

			primary() {
				var obj = {
					url: 'SRClock/SupplySRCD',
					method: 'post',
					data: this.parame
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
			}
		}
	}
</script>

<style lang="scss">
	.box {
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