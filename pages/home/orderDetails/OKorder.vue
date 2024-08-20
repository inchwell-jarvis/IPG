<template>
	<view class="box">
		<u-popup v-model="modal_show" mode="top" border-radius="14">
			<view class="information_pop">
				<h3>打卡信息</h3>


				<div class="information_pop_item">
					<div>事件</div>
					<div>{{punch_information.StateStr}}</div>
				</div>
				<div class="information_pop_item">
					<div>时间</div>
					<div>{{punch_information.CreateDate}}</div>
				</div>
				<div class="information_pop_item">
					<div>地点</div>
					<div>{{punch_information.Address}}</div>
				</div>

				<u-button type="primary" size="mini" style="float: right;margin-bottom: 10px;"
					@tap='Punch_information()'>修改信息</u-button>
			</view>
		</u-popup>

		<!-- 工单信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				工单信息
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.FieldServiceRecordID)">
				<view class="Mini_list_left">
					工单号
				</view>
				<view class="Mini_list_right">
					{{Data.FieldServiceRecordID}}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.XCallID)">
				<view class="Mini_list_left">
					报修号
				</view>
				<view class="Mini_list_right">
					{{Data.XCallID}}
				</view>
			</view>
			<view class="Mini_list" @longtap="CopyText(Data.Creater)">
				<view class="Mini_list_left">
					创建人
				</view>
				<view class="Mini_list_right">
					{{Data.Creater}}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.FaultInfo)">
				<view class="Mini_list_left">
					报修内容
				</view>
				<view class="Mini_list_right">
					{{Data.FaultInfo || ' - - '  }}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.Diagnose)">
				<view class="Mini_list_left">
					诊断内容
				</view>
				<view class="Mini_list_right">
					{{Data.Diagnose || ' - - '  }}
				</view>
			</view>
		</view>

		<!-- 客户信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				客户信息
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.CusFullName)">
				<view class="Mini_list_left">
					客户名称
				</view>
				<view class="Mini_list_right">
					{{Data.CusFullName}}
				</view>
			</view>


			<view class="Mini_list" @longtap="CopyText(Data.EndUserName)">
				<view class="Mini_list_left">
					最终客户
				</view>
				<view class="Mini_list_right">
					{{ Data.EndUserName || ' - - '	}}
				</view>
			</view>



			<view class="Mini_list" @longtap="CopyText(Data.ServiceCus)">
				<view class="Mini_list_left">
					服务客户名称
				</view>
				<view class="Mini_list_right">
					{{ Data.ServiceCus || ' - - '	}}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.ServiceCusAddress)">
				<view class="Mini_list_left">
					服务客户地址
				</view>
				<view class="Mini_list_right">
					{{ Data.ServiceCusAddress || ' - - '	}}
				</view>
			</view>


			<view class="Mini_list" @longtap="CopyText(Data.AuthorizedCus)">
				<view class="Mini_list_left">
					授权报修人
				</view>
				<view class="Mini_list_right">
					{{ Data.AuthorizedCus || ' - - '	}}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.Contact)">
				<view class="Mini_list_left">
					联系人
				</view>
				<view class="Mini_list_right">
					{{Data.Contact}}
				</view>
			</view>
			<view class="Mini_list" @longtap="CopyText(Data.Phone)" @tap='Tel(Data.Phone)'>
				<view class="Mini_list_left">
					电话
				</view>
				<view class="Mini_list_right">
					{{Data.Phone || ' - - '	}}
					<span style='color: #007AFF;'>点击呼叫</span>
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.OEMEngineerName)">
				<view class="Mini_list_left">
					OEM工程师姓名
				</view>
				<view class="Mini_list_right">
					{{ Data.OEMEngineerName || ' - - '	}}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.OEMEngineerMobile)" @tap='Tel(Data.OEMEngineerMobile)'>
				<view class="Mini_list_left">
					OEM工程师电话
				</view>

				<view class="Mini_list_right">
					{{ Data.OEMEngineerMobile || ' - - '	}}
					<span style='color: #007AFF;'>点击呼叫</span>
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.SentCusName)">
				<view class="Mini_list_left">
					发货客户
				</view>
				<view class="Mini_list_right">
					{{ Data.SentCusName || ' - - '	}}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.SentCusAddress)">
				<view class="Mini_list_left">
					发货地址
				</view>
				<view class="Mini_list_right">
					{{ Data.SentCusAddress || ' - - '	}}
				</view>
			</view>

			<view class="Mini_list">
				<view class="Mini_list_left">
					发货相关
				</view>
				<view class="Mini_list_right">
					<text v-for="(item,index) in Data.Logistics"
						@longtap="CopyText(item.Track_ref + ':' + item.Notes )">{{(index + 1)+ '. '  +   item.Track_ref + ':' + item.Notes }}<br>
					</text>
				</view>
			</view>
		</view>




		<!-- 设备信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				设备信息
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.Model)">
				<view class="Mini_list_left">
					型号
				</view>
				<view class="Mini_list_right">
					{{Data.Model}}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.SN)">
				<view class="Mini_list_left">
					序列号
				</view>
				<view class="Mini_list_right">
					{{Data.SN}}
				</view>
			</view>
		</view>




		<!-- 派工信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				派工信息
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.DispatchDt)">
				<view class="Mini_list_left">
					派工时间
				</view>
				<view class="Mini_list_right">

					{{(Data.DispatchDt || "").split('T')[0] }}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.ArriveDt)">
				<view class="Mini_list_left">
					计划到达时间
				</view>
				<view class="Mini_list_right">
					{{(Data.ArriveDt || "").split('T')[0] }}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.CompleteDt)">
				<view class="Mini_list_left">
					计划完成时间
				</view>
				<view class="Mini_list_right">
					{{(Data.CompleteDt || "").split('T')[0] }}
				</view>
			</view>

			<view class="Mini_list" @longtap="CopyText(Data.WorkHour)">
				<view class="Mini_list_left">
					常规工作时间
				</view>
				<view class="Mini_list_right">
					{{Data.WorkHour}}
				</view>
			</view>
		</view>




		<view class="TimeLine">
			<view class="TimeLineLi">
				<text v-if="Data.Details.length == 0">暂无路线信息</text>
				<view class="li" v-for="(item,index) in Data.Details" :key='index' @tap="check(item)">
					<h4>{{item.StateStr + (item.State == 2 ?( ' - ' +  item.Len + ' km ' ) : '' )    }}<span
							style='float: right;'>{{item.CreateDate || '' }}</span> </h4>
					<text>{{item.Address}}</text>
				</view>


				<view class="li">
					<h4>推荐总里程<span style='float: right;'>{{(Data.TotalTuiJianLen || '')  + ' km '}}</span> </h4>
					<h4>实际总里程<span style='float: right;'>{{(Data.TotalLen || '' ) + ' km '}}</span> </h4>
				</view>

				<div style="width:100%;height: 30px;" v-if="Data.StateStr = '已结单'">
					<div class="bc-button" @tap='replenish_check()'>
						补充打卡
					</div>
				</div>
			</view>
		</view>





		<view class="mapManual" style="overflow: hidden;padding-right: 10px;">
			<view class="Customer_Top">
				查看图片
			</view>
			<view style="width: 100%;min-height: 1px;">
				<text v-if="Data.Images.length == 0">暂无图片</text>
				<u-image class='img' v-for='(itemimg,index1) in Data.Images' :key='index1' width="90px" height="90px"
					:src="itemimg.Url" shape="square" border-radius='10' :fade="true" duration="450"
					@tap='lookimg(itemimg.Url)'>
				</u-image>
			</view>
		</view>


		<view class="mapManual" style="overflow: hidden;padding-right: 10px;">
			<view class="Customer_Top">
				备注
			</view>
			<view style="width: 100%;min-height: 1px;">
				{{Data.Memo == null ?  '无备注' : Data.Memo     }}
			</view>
		</view>

	</view>
</template>
<script>
	export default {
		name: 'one',
		data() {
			return {
				Data: {},

				checked: false,
				numberPlate: '', // 车牌号
				automatic_manual: true,
				address: '',

				modal_show: false,
				punch_information: {}

			}
		},

		created() {
			// init
			this.init()

		},
		methods: {
			replenish_check() {
				this.$store.state.SRCId = this.Data.SRCId
				uni.navigateTo({
					url: '../replenish_check_in/replenish_check_in'
				});
			},
			Punch_information() {
				this.$store.state.punch_information = this.punch_information
				uni.navigateTo({
					url: '../punch_information/punch_information'
				});
			},
			check(item) {
				console.log(item)
				console.log(this.Data)
				if (this.Data.StateStr == '已结单') {
					this.punch_information = item
					this.modal_show = true
				}
			},
			// 打电话
			Tel: function(str) {
				console.log(str)
				uni.makePhoneCall({
					phoneNumber: String(str) //仅为示例
				});
			},

			init: function() {
				var obj = {
					url: 'SRClock/GetSRClock',
					method: 'get',
					data: {
						srcid: this.$store.state.SRCId
					},
				}

				this.$http(obj)
					.then((res) => {
						console.log(res.Data)
						this.Data = res.Data
					})
					.catch((res) => {
						console.log(res)
					})
			},
			lookimg: function(xx) {
				var url = [xx]
				console.log('查看图片')
				uni.previewImage({
					urls: url
				})
			},
			CopyText: function(Data) {
				uni.setClipboardData({
					data: Data, //要被复制的内容
					success: (res) => { //复制成功的回调函数
						console.log(res)
						uni.showToast({ //提示
							title: '复制成功',
							icon: 'none',
						})
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		width: 100%;
		height: 100%;
		font-size: 14px;
		box-sizing: border-box;

		.bc-button {
			width: 80px;
			height: 30px;
			background: #19be6b;
			color: #fff;
			line-height: 30px;
			text-align: center;
			padding: 0 8px;
			border-radius: 4px;
			float: right;
		}

		.information_pop {
			padding: 10px;
			box-sizing: border-box;

			h3 {
				line-height: 40px;
			}

			.information_pop_item {
				margin-bottom: 10px;

				div:nth-child(1) {
					width: 60px;
					float: left;
				}

				div:nth-child(2) {
					width: calc(100% - 60px);
					float: left;
				}
			}
		}

		.mapManual {
			width: 95%;
			margin: auto;
			min-height: 80px;
			border-radius: 10px;
			border: 0.1px solid #808080;
			-webkit-box-shadow: 9px 9px 6px #d9e7f1;
			-moz-box-shadow: 9px 9px 6px #d9e7f1;
			box-shadow: 3px 3px 6px #d9e7f1;
			position: relative;
			padding-left: 10px;
			// padding-right: 100px;
			line-height: 25px;
			margin-bottom: 30px;

			.Customer_Top {
				width: 100%;
				height: 40px;
				border-bottom: 1px solid #c3c3c3;
				line-height: 40px;
				padding-left: 20px;
				padding-top: 3px;
				font-weight: bold;
				box-sizing: border-box;
			}

			.img {
				border: 1px solid #C0C0C0;
				-webkit-box-shadow: 9px 9px 6px #d9e7f1;
				-moz-box-shadow: 9px 9px 6px #d9e7f1;
				box-shadow: 3px 3px 6px #d9e7f1;
				margin: 5px;
				float: left;
			}


			.image {
				position: absolute;
				width: 80px;
				height: 80px;
				right: 10px;
				top: 0;
			}
		}


		.TimeLine {
			width: 100%;
			min-height: 50px;
			background-color: #FFFFFF;
			padding: 10px;
			box-sizing: border-box;

			.TimeLineLi {
				width: 100%;
				min-height: 50px;
				border-radius: 10px;
				border: 0.1px solid #808080;
				-webkit-box-shadow: 9px 9px 6px #d9e7f1;
				-moz-box-shadow: 9px 9px 6px #d9e7f1;
				box-shadow: 3px 3px 6px #d9e7f1;
				padding: 5%;

				.li {
					width: 90%;
					min-height: 50px;
					border-left: 1px solid #808080;
					padding: 5px;
					position: relative;
					box-sizing: border-box;
					font-size: 12px;

					h4 {
						margin-bottom: 10px;

						span {
							color: #565656;
						}
					}
				}

				.li:before {
					content: '';
					position: absolute;
					left: 0px;
					bottom: 0px;
					right: auto;
					height: 2px;
					width: 10px;
					background-color: #000000;
				}

			}

		}

		// 搬运客户APP详情页
		.Customer {
			width: 100%;
			min-height: 50px;
			background-color: #FFFFFF;
			margin-top: 10px;
			margin-bottom: 10px;

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
				min-height: 30px;
				line-height: 30px;
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
			}
		}


		.map {
			width: 100%;
			min-height: 100px;
			background-color: #FFFFFF;
			padding: 10px;
			box-sizing: border-box;

			.mapManual {
				width: 100%;
				min-height: 80px;
				border-radius: 10px;
				border: 0.1px solid #808080;
				-webkit-box-shadow: 9px 9px 6px #d9e7f1;
				-moz-box-shadow: 9px 9px 6px #d9e7f1;
				box-shadow: 3px 3px 6px #d9e7f1;
				position: relative;
				padding-left: 10px;
				padding-right: 100px;
				line-height: 25px;
				margin-bottom: 30px;

				.image {
					position: absolute;
					width: 80px;
					height: 80px;
					right: 10px;
					top: 0;
				}
			}

			.div {
				width: 100%;
				min-height: 30px;
				padding-left: 2px;
				margin-top: 10px;
				line-height: 30px;
				font-size: 13px;
			}
		}
	}
</style>