<template>
	<view class="box">
		<!-- 压窗屏 -->
		<u-modal v-model="modal_show" show-cancel-button @confirm='UpdateSRCState()' :content="modal_content"></u-modal>
		<!--  @longtap="CopyText(Data.FieldServiceRecordID)" -->

		<u-top-tips ref="uTips" navbar-height='75'></u-top-tips>

		<view class="MY" v-if="indexState == 2">
			<u-empty text="当前没有正在执行的工单" mode="list"></u-empty>
		</view>

		<view class="head_top_Title">
			<p>打卡详情</p>
			<u-icon v-if="indexState == 0" @tap='order()' name="order" color="#2979ff" size="40" class='icon'></u-icon>
			<u-icon v-if="indexState == 0" @tap='Fun()' name="arrow-left" size="40" class='iconl'></u-icon>
		</view>


		<!-- 基础信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				暂停 / 结束
			</view>
			<div class="But_RTcjmi">

				<u-button v-if='JCData.State == 2 || JCData.State == 3 || JCData.State == 5' size="medium"
					type="warning" @tap='UpdateSRCStateInit(5)'>暂停</u-button>
				<u-button v-if='JCData.State == 2 || JCData.State == 3 || JCData.State == 5' size="medium" type="error"
					@tap='UpdateSRCStateInit(4)'>结束</u-button>


				<u-button v-if='!(JCData.State == 2 || JCData.State == 3 || JCData.State == 5)' size="medium"
					type="info">暂停</u-button>
				<u-button v-if='!(JCData.State == 2 || JCData.State == 3 || JCData.State == 5)' size="medium"
					type="info">结束</u-button>

			</div>
		</view>


		<!-- 基础信息 -->
		<view class="Customer" v-if="JCData">
			<view class="Customer_Top">
				基础信息
			</view>
			<div v-if='JCData.NullSR'>
				<u-cell-group>
					<u-cell-item @tap='MergeOrder()' icon="error-circle" title="当前为空工单" value="将打卡信息导入工单"></u-cell-item>
				</u-cell-group>
			</div>

			<div v-if='!JCData.NullSR'>
				<view class="Mini_list" @longtap="CopyText(JCData.FieldServiceRecordID)">
					<view class="Mini_list_left">
						工单号
					</view>
					<view class="Mini_list_right">
						{{JCData.FieldServiceRecordID}}
					</view>
				</view>

				<view class="Mini_list" @longtap="CopyText(JCData.XCallID)">
					<view class="Mini_list_left">
						报修号
					</view>
					<view class="Mini_list_right">
						{{JCData.XCallID}}
					</view>
				</view>

				<view class="Mini_list" @longtap="CopyText(JCData.Creater)">
					<view class="Mini_list_left">
						创建人
					</view>
					<view class="Mini_list_right">
						{{JCData.Creater}}
					</view>
				</view>


				<view class="Mini_list" @longtap="CopyText(JCData.CusFullName)">
					<view class="Mini_list_left">
						客户名称
					</view>
					<view class="Mini_list_right">
						{{JCData.CusFullName}}
					</view>
				</view>


				<view class="Mini_list" @longtap="CopyText(JCData.ServiceCus)">
					<view class="Mini_list_left">
						服务客户名称
					</view>
					<view class="Mini_list_right">
						{{ JCData.ServiceCus || ' - - '	}}
					</view>
				</view>

				<view class="Mini_list" @longtap="CopyText(JCData.ServiceCusAddress)">
					<view class="Mini_list_left">
						服务客户地址
					</view>
					<view class="Mini_list_right">
						{{ JCData.ServiceCusAddress || ' - - '	}}
					</view>
				</view>

				<view class="Mini_list" @longtap="CopyText(JCData.Model)">
					<view class="Mini_list_left">
						型号
					</view>
					<view class="Mini_list_right">
						{{JCData.Model}}
					</view>
				</view>

				<view class="Mini_list" @longtap="CopyText(JCData.SN)">
					<view class="Mini_list_left">
						序列号
					</view>
					<view class="Mini_list_right">
						{{JCData.SN}}
					</view>
				</view>
			</div>
			<div v-if='JCData.NullSR'>
				<!-- 空白订单情况 -->
			</div>
		</view>


		<!-- 打卡信息 -->
		<view class="Customer">
			<view class="Customer_Top">
				打卡信息
			</view>

			<view class="Mini_list" style="margin: 10px 0;">
				<view class="Mini_list_left">
					是否报销里程
				</view>
				<view class="Mini_list_right">

					<u-switch size='40' style='margin-top: 5px;float: left;' v-model="checked" active-color='#19be6b'
						inactive-color='#fa3534' @change='switchB'></u-switch>
					<text v-if='JCData.State != 0' style="float: right;">{{JCData.TicketNumber}}</text>
				</view>
			</view>

			<view v-if='!checked' class="Mini_list" style="padding-bottom: 10px;">
				<u-input v-model="numberPlate" type="text" :border="true"
					style='width: 70%;display: block;margin-left: 5%;' placeholder='如使用公司车辆，请输入车牌号' />
				<u-button class='But' style='width: 20%;height: 34px;' type="primary" @tap='Uploadlicense()'>上传
				</u-button>
			</view>
		</view>



		<view class="TimeLine">
			<view class="TimeLineLi">

				<view class="li" v-for="(item,index) in JCData.Details" :key='index'>
					<h4>{{item.StateStr + (item.State == 2 ?( ' - ' +  item.Len + ' km ' ) : '' )    }}<span
							style='float: right;'>{{item.CreateDate || '' }}</span> </h4>
					<text>{{item.Address}}</text>
				</view>


				<view class="li">
					<h4>推荐总里程<span style='float: right;'>{{(JCData.TotalTuiJianLen || '')  + ' km '}}</span> </h4>
					<h4>实际总里程<span style='float: right;'>{{(JCData.TotalLen || '' ) + ' km '}}</span> </h4>
				</view>

			</view>
		</view>





		<view class="map">
			<view class="mapManual" style="padding-right: 100px;">
				<text>{{automatic_manual == true ? '(自动定位)' : '(选择定位)' }} 当前位置：{{address}}</text>
				<image class="image" src="../../static/image/maps.png" mode="" @tap="ClickMap()"></image>
			</view>


			<u-form v-if='JCData.State == 1'>
				<text style="font-size: 13px;">最佳里程 <span style='margin-left: 45px;'>{{BestMileage + 'km'}}</span>
					<u-button type="primary" size='mini' style='float: right;' @click='BestMileageFUNCX()'>重新获取
					</u-button>
				</text>
				<u-form-item label-width='200' label="修改里程">
					<u-input v-model="UpdateMileage" type="text" placeholder="请输入修改的里程(km)" @input='checkPrice' />
					<!-- <u-keyboard ref="uKeyboard"  mode="number"  :mask="false" :dot-enabled="false" v-model="keyboardShow"></u-keyboard> -->

				</u-form-item>
				<u-form-item label-width='200' label="修改原因" prop="intro">
					<u-input v-model="UpdateReason" type='textarea' placeholder="请输入修改的原因" />
				</u-form-item>
				<u-form-item label-width='200' label="请选择">
					<u-radio-group v-model="radio" :wrap='true'>
						<u-radio v-for="(item, index) in radioList" :key="index" :name="item.name" style="line-height: 40px;"
							:disabled="item.disabled">
							{{ item.name }}
						</u-radio>
					</u-radio-group>
				</u-form-item>
			</u-form>


			<view class="mapManual" v-if='JCData.State == 3'>
				<u-form>
					<u-form-item label-width='200' label="请选择">
						<u-radio-group v-model="CompleteState" :wrap='true'>
							<u-radio v-for="(item, index) in CompleteList" :key="index" :name="item.name"  style="line-height: 40px;"
								:active-color="(index == 0 ? 'red' :'#00ff00' )" :disabled="item.disabled">
								{{ item.name }}
							</u-radio>
						</u-radio-group>
					</u-form-item>
				</u-form>
			</view>

			<!-- 上传图片 -->
			<view class="mapManual" style="overflow: hidden;padding-right: 10px;">
				<view class="Customer_Top">
					上传图片
				</view>
				<view style="width: 100%;min-height: 1px;">
					<view v-for='(itemimg,index1) in JCData.Images' :key='index1'
						style="position: relative;width: 90px;height: 90px;float: left;margin: 5px;">
						<u-icon name="close-circle-fill" color="#fa3534" size="35"
							style='position: absolute;top: 10px;right: 3px;z-index: 100;'
							@tap='delimgid = itemimg.ID,DelImgshow = true'></u-icon>

						<u-image class='img' width="90px" height="90px" :src="itemimg.Url" shape="square"
							border-radius='10' :fade="true" duration="450" @tap='lookimg(itemimg.Url)'>
						</u-image>
					</view>
				</view>
				<u-upload width="90px" height="90px" style='float: left;' ref="uUpload" :action="action"
					@on-choose-complete='submit()' :auto-upload="false"></u-upload>
			</view>



			<!-- 备注 -->
			<view class="mapManual" style="padding-right: 10px;">
				<view class="Customer_Top">
					备注
					<u-button @click="UpSaveMemo()" style='float: right;' type="primary" size='medium'
						:loading='loadingState'>上传</u-button>
				</view>
				<view style="width: 100%;min-height: 90px;">
					<u-input v-model="SaveMemo" type="textarea" height='180' :border="true" />
				</view>

			</view>

			<!-- 出发 暂停 到达 -->
			<view class="botView">
				<u-modal v-model="botView_show" show-cancel-button @confirm='FunChoosing()' :content="botView_content">
				</u-modal>
				<u-button v-if='JCData.State == 2 || JCData.State == 3 || JCData.State == 5' type="primary"
					@tap='DepartureAndArrival(1)'>
					出发</u-button>
				<u-button v-if='JCData.State == 1' type="primary" @tap='DepartureAndArrival(2)'>到达
				</u-button>
			</view>

		</view>

		<u-modal v-model="DelImgshow" :content="DelImgContent" show-cancel-button @confirm='DelImage()'></u-modal>
		<!-- 询问为什么在30分钟内离开工作现场 -->
		<u-modal v-model="leave_the_scene" show-cancel-button @confirm='explain_reason()' confirm-text='确认离开'>
			<view class="u-update-content">
				<text>本次在工作现场未超过30分钟，如现在打卡离开，则需要说明工作时间较短的原因:</text>
				<u-input v-model="reason" type="textarea" :border="true" />
			</view>
		</u-modal>



	</view>
</template>

<script>
	import {
		pathToBase64
	} from '../../components/Base64/index.js'

	export default {
		data() {
			return {
				reason: '',
				leave_the_scene: false, //离开现场
				DelImgshow: false,
				DelImgContent: '是否删除此图片?',
				delimgid: '',
				checked: false,
				show: false,
				numberPlate: '',
				address: '',
				automatic_manual: true,
				JCData: {},
				indexState: 0,
				ZuoBiao: '',
				value: '',
				BestMileage: ' - - ', // 最佳里程
				UpdateMileage: '', // 修改的里程
				UpdateReason: '', //修改原因
				radioList: [{
						name: '到达途中/酒店',
						disabled: false
					},
					{
						name: '到达家/公司',
						disabled: false
					},
					{
						name: '到达工作现场',
						disabled: false
					},
					// {
					// 	name: '结束工单',
					// 	disabled: false
					// }
				],
				radio: '到达途中/酒店',
				CompleteList: [{
						name: '未完成任务',
						disabled: false
					},
					{
						name: '已完成任务',
						disabled: false
					}
				],
				CompleteState: '未完成任务',


				action: 'http://www.example.com/upload',
				ImgBase64List: [],
				// 转换图片上传过渡
				UpimageLength: 0,
				loadingState: false,
				SaveMemo: "", //备注
				// 获取最佳距离次数
				get_angle_similarity: 0,
				modal_show: false,
				modal_content: '',
				UpdateSRCState_LIlS37: 0,
				// -------------
				botView_show: false,
				botView_content: '',
				botView_index: 0,
			}
		},
		created() {
			console.log('触发created')
			this.GetSRClocks()
			this.getLocation()
		},
		// created() {
		// 	this.GetSRClocks()
		// 	this.getLocation()
		// },
		methods: {
			checkPrice: function(e) {
				if (e.indexOf('.') != -1) {
					this.$refs.uTips.show({
						title: '修改里程禁止输入小数点，请修改',
						type: 'warning',
						duration: '2300'
					})
				}
			},
			// 暂停工单 、结束工单 询问弹窗
			UpdateSRCStateInit: function(row) {
				this.UpdateSRCState_LIlS37 = row
				this.modal_content = (row == 5 ? '是否暂停此工单？' : '是否结束此工单？')
				this.modal_show = true
			},

			// 暂停工单 、结束工单  
			UpdateSRCState: function() {
				this.modal_show = false
				var obj = {
					url: 'SRClock/UpdateSRCState',
					method: 'post',
					data: {
						SRCId: this.JCData.SRCId, // 如果是空工单则传空
						State: this.UpdateSRCState_LIlS37,
					},
				}
				this.$http(obj)
					.then((res) => {
						console.log(res.Data)

						this.$refs.uTips.show({
							title: this.UpdateSRCState_LIlS37 == 5 ? '已暂停' : '已结束',
							type: 'success',
							duration: '2300'
						})
						this.Fun()
					})
					.catch((res) => {
						console.log(res)
					})
			},

			// Fun   返回主页
			Fun: function() {
				uni.switchTab({
					url: '/pages/home/home'
				})
			},

			// 出发 到达 提示框
			DepartureAndArrival: function(row) {
				this.botView_show = true
				this.botView_content = (row == 1 ? '出发此工单？' : '到达此工单？')
				this.botView_index = row
			},

			// 选择 出发 到达
			FunChoosing: function() {
				this.botView_index == 1 ? this.OpenSRClock() : this.reach()
			},
			// 说明原因
			explain_reason() {
				if(!this.reason){
					this.$refs.uTips.show({
						title: '请输入原因！',
						type: 'warning',
						duration: '2300'
					})
					return false
				}
				this.OpenSRClock(true)
			},

			// 出发
			OpenSRClock: function(bool = false) {
				// AtCustomerSite
				if (!this.JCData.AtCustomerSite) {
					this.CompleteState = ''
				} else {
					var State = (this.CompleteState == '未完成任务' ? false : true)
				}

				if (this.address == '') {
					this.$refs.uTips.show({
						title: '地址错误，请刷新',
						type: 'warning',
						duration: '2300'
					})
					return false
				}

				var obj = {
					url: 'SRClock/Leaving',
					method: 'post',
					data: {
						SRCId: this.JCData.SRCId, // 如果是空工单则传空
						Address: this.address, //地址
						Coordinate: this.ZuoBiao, //坐标
						Drag: !this.automatic_manual, //是否拖动了地图位置
						Complete: State,
					},
				}
				if (bool) {
					obj.data['QuickEndReason'] = this.reason
				}
				this.$http(obj)
					.then((res) => {
						console.log('000000000000----------------------------------------------------')
						console.log(res)
						if (res.Msg == '到达工作现场不足30分钟，请说明原因(Leaving)') {
							this.leave_the_scene = true
						} else {
							this.GetSRClocks()
						}
						this.reason = ''
					})
					.catch((res) => {
						console.log(res)
					})
			},

			//到达
			reach: function(row) {
				// 判断是否 暂停
				var Suspend = false
				if (row == 'zanting') {
					Suspend = true
				}
				if (this.BestMileage == ' - - ') {
					this.$refs.uTips.show({
						title: '请等待计算最佳距离！',
						type: 'warning',
						duration: '2300'
					})
					return false
				}
				if (this.UpdateMileage.indexOf('.') != -1) {
					this.$refs.uTips.show({
						title: '修改里程禁止输入小数点，请修改',
						type: 'warning',
						duration: '2300'
					})
					return false
				}

				if (this.radio == '到达途中/酒店') {
					var Destination = 1
				}
				if (this.radio == '到达工作现场') {
					var Destination = 2
				}
				if (this.radio == '结束工单') {
					var Destination = 3
				}
				if (this.radio == '到达家/公司') {
					var Destination = 4
				}



				var obj = {
					url: 'SRClock/Arrive',
					method: 'post',
					data: {
						SRCId: this.JCData.SRCId, //列表页返回的工单Id  如果是空工单则传空
						Address: this.address, //地址
						Coordinate: this.ZuoBiao, //坐标
						Drag: !this.automatic_manual, //是否拖动了地图位置
						UpdateMileage: this.UpdateMileage, //修改里程
						UpdateReason: this.UpdateReason, //修改原因
						DefaultMileage: this.BestMileage, //最佳里程
						Destination: Destination, //到达地址        1途中/酒店        2工作现场        3结束工单
						Suspend: Suspend,
					}
				}
				console.log(obj.data)
				this.$http(obj)
					.then((res) => {
						console.log(res.Data)
						this.UpdateMileage = ''
						this.UpdateReason = ''
						this.GetSRClocks()
					})
					.catch((res) => {
						console.log(res)
					})
			},

			//赋值 功能
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

			// MergeOrder
			MergeOrder: function() {
				this.$store.state.BDSoid = this.JCData.SRCId
				uni.navigateTo({
					url: 'MergeOrder/MergeOrder'
				})
			},

			UpSaveMemo: function() {

				var obj = {
					url: 'SRClock/SaveMemo',
					method: 'post',
					data: {
						SRCId: this.JCData.SRCId, // 如果是空工单则传空
						Memo: this.SaveMemo,
					},
				}
				this.$http(obj)
					.then((res) => {
						console.log(res.Data)
						this.GetSRClocks()
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
			// 删除图片
			DelImage: function() {


				var obj = {
					url: 'SRClock/DelImage',
					method: 'post',
					data: {
						Id: this.delimgid // 如果是空工单则传空
					},
				}
				this.$http(obj)
					.then((res) => {
						console.log(res.Data)
						this.GetSRClocks()
					})
					.catch((res) => {
						console.log(res)
					})
			},

			submit: function() {

				let files = [];
				files = this.$refs.uUpload.lists;
				if (files.length == 0) {
					this.$refs.uTips.show({
						title: '请选择图片',
						type: 'warning',
						duration: '2300'
					})
					return false
				}
				uni.showLoading({
					title: '上传中'
				});
				this.loadingState = true

				this.UpimageLength = files.length
				for (var i = 0; i < files.length; i++) {
					pathToBase64(files[i].url)
						.then(base64 => {
							this.UpimageBase64(base64)
						})
						.catch(error => {
							console.error(error)
						})
				}
			},
			// 上传img
			UpimageBase64: function(base) {
				var My = this
				var obj = {
					url: 'SRClock/UploadImage',
					method: 'post',
					data: {
						Id: My.JCData.SRCId, // 如果是空工单则传空
						BaseSFStr: base,
					},
				}
				My.$uniwebno(obj)
					.then((res) => {
						console.log(res.Data)
						My.GetSRClocks()
						My.UpimageLength -= 1
						if (My.UpimageLength == 0) {
							My.loadingState = false
							this.$refs.uUpload.lists = []
							setTimeout(function() {
								uni.hideLoading();
								My.GetSRClocks()
							}, 100);
						}
					})
					.catch((res) => {
						My.loadingState = false
						setTimeout(function() {
							uni.hideLoading();
							My.GetSRClocks()
						}, 100);
					})
			},
			// 获取地理位置
			getLocation: function() {
				var My = this
				uni.getLocation({
					type: 'wgs84',
					altitude: false,
					geocode: true,
					success: function(res) {
						console.log(res)
						var IP = res.address
						if (IP.province == IP.city) {
							IP.city = ''
						}
						My.address = IP.province + IP.city + IP.district + IP.street + IP.streetNum + IP
							.poiName
						My.automatic_manual = true
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
						My.ZuoBiao = res.latitude + ',' + res.longitude
					}
				});
			},
			// 前往工单详情
			order: function() {
				console.log('查看详情')
				this.$store.state.SRCId = this.JCData.SRCId
				uni.navigateTo({
					url: '../home/orderDetails/OKorder'
				});
			},

			// 打开地图选择位置
			// 手动修改定位后  如果自动定位慢  也不使用自动定位
			ClickMap: function() {
				var My = this
				uni.chooseLocation({
					success: function(res) {
						console.log('位置名称：' + res.name);
						console.log('详细地址：' + res.address);
						console.log('纬度：' + res.latitude);
						console.log('经度：' + res.longitude);
						My.BestMileage = ' - - '
						My.address = res.address
						My.automatic_manual = false
						My.ZuoBiao = res.latitude + ',' + res.longitude

						if (My.JCData.State == 1) {
							My.$refs.uTips.show({
								title: '正在重新计算最佳距离！',
								type: 'success',
								duration: '2300'
							})
						}

						var obj = {
							url: 'SRClock/BestMileage',
							method: 'post',
							data: {
								SRCId: My.JCData.SRCId, //列表页返回的工单Id  如果是空工单则传空
								Coordinate: My.ZuoBiao, //坐标
							}
						}
						console.log('获取最佳里程')
						My.$http(obj)
							.then((res) => {
								console.log(res)
								My.BestMileage = res.Data
								My.$refs.uTips.show({
									title: '准备完成！请操作！',
									type: 'success',
									duration: '2300'
								})
								console.log('++++++++++++++++++++++++++++++++++++')
							})
							.catch((res) => {
								console.log(res)
								console.log(
									'-----------------------------------------')
							})
					}
				});
			},
			// 获取正在执行的任务
			GetSRClocks: function() {
				var obj = {
					url: 'SRClock/GetSRClock',
					method: 'get',
					data: {
						srcid: this.$store.state.SRCId
					},
				}
				this.$http(obj)
					.then((res) => {
						console.log(res)
						this.indexState = 0
						if (res.Data == null) {
							this.indexState = 2
							return false
						}
						this.JCData = {}
						this.JCData = res.Data
						this.checked = this.JCData.Reimbursement
						this.SaveMemo = this.JCData.Memo

						for (var i = 0; i < this.JCData.Details.length; i++) {
							var value = this.JCData.Details[i].CreateDate
							var dateee = new Date(value).toJSON();
							this.JCData.Details[i].CreateDate = new Date(+new Date(dateee) + 8 * 3600 * 1000)
								.toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
						}

						var My = this
						My.$refs.uTips.show({
							title: '正在获取当前位置！',
							type: 'success',
							duration: '2300'
						})
						uni.getLocation({
							type: 'gcj02',
							altitude: false,
							geocode: true,
							success: function(res) {
								var IP = res.address
								if (IP.province == IP.city) {
									IP.city = ''
								}
								My.address = IP.province + IP.city + IP.district + IP.street + IP
									.streetNum + IP
									.poiName
								// 如果已经手动定位 则不进入
								if (My.automatic_manual) {
									My.automatic_manual = true
									console.log('当前位置的经度：' + res.longitude);
									console.log('当前位置的纬度：' + res.latitude);
									My.ZuoBiao = res.latitude + ',' + res.longitude
								}
								if (My.JCData.State == 1) {
									My.$refs.uTips.show({
										title: '正在计算最佳距离！',
										type: 'success',
										duration: '2300'
									})
									My.BestMileageFUN()
								}
							}
						});
					})
					.catch((res) => {
						console.log(res)
					})
			},
			// 重新计算最佳距离
			BestMileageFUNCX: function() {

				var My = this
				My.$refs.uTips.show({
					title: '正在尝试重新获取最佳距离！',
					type: 'success',
					duration: '2300'
				})
				var obj = {
					url: 'SRClock/BestMileage',
					method: 'post',
					data: {
						SRCId: My.JCData.SRCId, //列表页返回的工单Id  如果是空工单则传空
						Coordinate: My.ZuoBiao, //坐标
						// Coordinate: '1515454.4454545454545,999999999.154545454545', //坐标

					}
				}
				My.$http(obj)
					.then((res) => {
						My.BestMileage = res.Data
						My.$refs.uTips.show({
							title: '准备完成！请操作！',
							type: 'success',
							duration: '2300'
						})

					})
					.catch((res) => {
						My.BestMileageFUN()
					})
			},
			// 计算最佳距离
			BestMileageFUN: function() {
				var My = this
				var obj = {
					url: 'SRClock/BestMileage',
					method: 'post',
					data: {
						SRCId: My.JCData.SRCId, //列表页返回的工单Id  如果是空工单则传空
						Coordinate: My.ZuoBiao, //坐标
						// Coordinate: '1515454.4454545454545,999999999.154545454545', //坐标
					}
				}
				console.log('获取最佳里程')
				My.$http(obj)
					.then((res) => {
						My.BestMileage = res.Data
						My.$refs.uTips.show({
							title: '准备完成！请操作！',
							type: 'success',
							duration: '2300'
						})

					})
					.catch((res) => {
						My.get_angle_similarity += 1
						if (My.get_angle_similarity > 5) {
							My.$refs.uTips.show({
								title: '最佳距离获取失败，请手动获取',
								type: 'info',
								duration: '2300'
							})
							return false
						}
						My.$refs.uTips.show({
							title: '最佳距离获取失败，进行第' + My.get_angle_similarity + '次重试',
							type: 'error',
							duration: '2300'
						})
						My.BestMileageFUN()
					})
			},

			// 修改是否需要报销状态
			switchB: function(e) {
				console.log('报销 清空车牌号')
				if (e) {
					// 报销
					var obj = {
						url: 'SRClock/UpdateReimbursement',
						method: 'post',
						data: {
							SRCId: this.JCData.SRCId, //列表页返回的工单Id  如果是空工单则传空
							Reimbursement: e, //是否报销
							TicketNumber: '',
						}
					}
					this.$http(obj)
						.then((res) => {
							console.log(res)
							console.log('-----------------------------------------')
							this.GetSRClocks()
						})
						.catch((res) => {
							console.log(res)
						})
				}
			},
			Uploadlicense: function() {
				if (this.numberPlate == '') {
					this.$refs.uTips.show({
						title: '请输入车牌号',
						type: 'warning',
						duration: '2300'
					})
					return false
				}


				// 不报销
				var obj = {
					url: 'SRClock/UpdateReimbursement',
					method: 'post',
					data: {
						SRCId: this.JCData.SRCId, //列表页返回的工单Id  如果是空工单则传空
						Reimbursement: false, //是否报销
						TicketNumber: this.numberPlate,
					}
				}
				this.$http(obj)
					.then((res) => {
						console.log(res)
						console.log('-----------------------------------------')
						this.numberPlate = ''
						this.GetSRClocks()
					})
					.catch((res) => {
						console.log(res)
					})

			}

		}
	}
</script>

<style scoped lang="scss">
	.box {
		padding-top: 80px;
		position: relative;

		.u-full-content {
			background-color: #00C777;
		}

		.u-update-content {
			font-size: 26rpx;
			color: $u-content-color;
			line-height: 1.7;
			padding: 30rpx;
		}

		.MY {
			width: 100%;
			height: 100%;
			z-index: 99;
			position: fixed;
			left: 0;
			top: 0;
			background-color: #FFFFFF;
			text-align: center;
			line-height: 500px;
		}

		.head_top_Title {
			width: 100%;
			height: 72px;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 999;
			background-color: #FFFFFF;
			padding-top: 30px;
			text-align: center;
			line-height: 40px;
			font-size: 16px;

			.icon {
				position: absolute;
				right: 10px;
				bottom: 13px;
				z-index: 999;
			}

			.iconl {
				position: absolute;
				left: 10px;
				bottom: 13px;
				z-index: 999;
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

			.div {
				width: 100%;
				min-height: 30px;
				padding-left: 2px;
				margin-top: 10px;
				line-height: 30px;
				font-size: 13px;
			}
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

				.But {
					position: absolute;
					right: 5%;
					top: 0px;
				}
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



		// 最下方按钮模块
		.botView {
			width: 100%;
			height: 100px;
			display: flex;
			justify-content: safe center;
			align-self: safe center;
			flex-wrap: wrap;

			button {
				width: 70px;
				height: 70px;
				border-radius: 50%;
				font-size: 16px;
				margin-top: 20px;
			}

		}
	}
</style>