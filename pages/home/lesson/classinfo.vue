<template>
	<view class="">
		<u-navbar :title="className" :autoBack="true" safeAreaInsetTop fixed :placeholder="true">
		</u-navbar>
		<view>
			<u-button style="width: 400rpx;margin-top: 1rem;" :throttleTime="1000" type="info" text="学生列表"
				@click="handleStudentList"></u-button>
			<u-button style="width: 400rpx;margin-top: 1rem;" :throttleTime="1000" type="primary"
				icon="plus-circle-fill" text="发起签到" @click="handlePublishSignin"></u-button>
			<view class="" style="margin-top: 1rem;">
				<view v-for="item in signinTaskList" class="task-item p1rem pr" @click="handleOpenTaskInfo(item)">
					<view v-if="item.signinEnd" class="task-end">已结束</view>
					<view class="fw600">标题：{{item.title}}</view>
					<view>签到人数：{{item.realSigninCount}}/{{item.waitSigninCount}}</view>
					<view class="signin-complate" v-if="item.realSigninCount==item.waitSigninCount"><u-icon
							name="checkmark-circle" color="#00aa00" size="24"></u-icon>签到完成
					</view>
					<view class="cg fs9">发起时间：{{item.createTime}}</view>
					<view class="cg fs9">签到时间：
						<view>{{item.beginTime}}</view>
						~
						<view>{{item.endTime}}</view>
					</view>
				</view>
				<view class="flex-center mtb1rem">
					<u-empty v-if="dataNotMore" text="暂无更多数据"></u-empty>
					<u-button v-else style="width: 300rpx;" :throttleTime="1000" type="info" icon="checkbox-mark"
						text="加载更多" @click="loadMore"></u-button>
				</view>
				<u-popup :show="showTaskInfo" :round="10" :closeable="true" @close="closeTaskInfo" @open="openTaskInfo">
					<view class="task-info-popup">
						<view class="plr1rem"><text>签到记录</text></view>
						<view class="signin-record">
							<view v-for="item in signinRecordList" class="signin-record-item flex-between">
								<view class="flex-start">
									<view class="left">
										<u-image :src="item.avatar" mode="widthFix" width="64px" height="64px"
											shape="circle" :lazy-load="true"></u-image>
									</view>
									<view class="center">
										<view class="fw600" style="font-size: 1.2rem;">{{item.nickName}}</view>
										<view class="fs9 cg">签到时间：{{item.createTime}}</view>
										<view v-if="item.addressDetail" class="fs9 cg">签到地点：{{item.addressDetail}}
										</view>
										<view v-if="item.faceStatus=='1'" class="fs9 cg tips-green">签到成功</view>
										<!-- <view v-if="item.faceStatus=='0'" class="fs9 cg tips-red">签到失败</view> -->
									</view>
								</view>
								<view class="right" v-if="item.pictureUrl">
									<u-image width="64px" height="64px" :radius="5" @click="imgPreview(item.pictureUrl)"
										:src="item.pictureUrl" :lazy-load="true"></u-image>
								</view>
							</view>
						</view>
					</view>
				</u-popup>
			</view>
			<u-popup :show="showPublish" :round="10" :mode="'bottom'" :safeAreaInsetBottom="true"
				:safeAreaInsetTop="true" :closeable="true" :closeOnClickOverlay="true" @close="close" @open="open">
				<view class="p1rem">
					<view class="tac">发起签到</view>
					<u--form labelPosition="left" :model="publishSigninForm" ref="publishSigninForm">
						<u-form-item label="标题:" prop="title" borderBottom labelWidth="80" ref="item1">
							<u--input v-model="publishSigninForm.title" border="none" placeholder="请输入标题"></u--input>
						</u-form-item>
						<u-form-item label="开始时间:" prop="beginTime" borderBottom labelWidth="80" ref="item2"
							@click="showPickerBegin = true; hideKeyboard()">
							<text>{{publishSigninForm.beginTime}}</text>
							<u-datetime-picker :show="showPickerBegin" v-model="publishSigninForm.beginTime" mode="time"
								@cancel="cancelBegin" @confirm="confirmBegin" :formatter="formatter"
								:min-hour="minHour"></u-datetime-picker>
						</u-form-item>
						<u-form-item label="结束时间:" prop="endTime" borderBottom labelWidth="80" ref="item2"
							@click="showPicker = true; hideKeyboard()">
							<text>{{publishSigninForm.endTime}}</text>
							<u-datetime-picker :show="showPicker" v-model="publishSigninForm.endTime" mode="time"
								@cancel="cancel" @confirm="confirm" :formatter="formatter"
								:min-hour="minHour"></u-datetime-picker>
						</u-form-item>
						<u-form-item label="签到类型:" prop="signinType" borderBottom labelWidth="80" ref="item3"
							@click="showSigninTypePicker=true">
							<text>{{signinTypePickerValue}}</text>
							<u-picker v-model="publishSigninForm.signinType" :show="showSigninTypePicker"
								:columns="columns" keyName="name" @close="closeSigninTypePicker"
								@cancel="cancelSigninTypePicker" @confirm="confirmSigninTypePicker"></u-picker>
						</u-form-item>
					</u--form>
					<u-button style="width: 400rpx;margin-top: 1rem;" :throttleTime="1000" type="primary"
						icon="checkbox-mark" text="确认提交" @click="confirmPublishSignin"></u-button>
				</view>
			</u-popup>
			<u-popup :show="showStudentList" :round="10" :closeable="true" @close="closeStudentList"
				@open="openStudentList">
				<view class="task-info-popup">
					<view class="plr1rem"><text>学生列表</text></view>
					<view class="signin-record">
						<view v-for="item in studentList" class="signin-record-item flex-between">
							<view class="flex-start">
								<view class="left">
									<u-image :src="item.user.avatar" mode="widthFix" width="64px" height="64px"
										shape="circle" :lazy-load="true"></u-image>
								</view>
								<view class="center">
									<view class="flex-between">
										<view class="fw600" style="font-size: 1.2rem;">{{item.user.nickName}}

										</view>
										<view class="fw600" style="color: red;" v-if="item.monitorFlag=='1'">班长</view>
									</view>
								</view>
							</view>
							<view class="right" v-if="item.monitorFlag=='0'">
								<u-button style="width: 200rpx;margin-top: 1rem;" :throttleTime="1000" type="primary"
									text="设为班长" @click="handleAuthMonitor(item.studentId)"></u-button>
							</view>
						</view>
					</view>
				</view>
			</u-popup>
		</view>
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
	import {
		addLessonClass,
		classStudentList,
		authMonitor
	} from "@/api/app/lessonClass.js";
	import {
		addSigninTask,
		signinTaskPage,
		signinTaskRecordList
	} from "@/api/app/signinTask.js";

	export default {
		data() {
			return {
				classId: null,
				className: null,
				showPublish: false,
				publishSigninForm: {
					classId: null,
					title: null,
					beginTime: "",
					endTime: "",
					signinType: '0'
				},
				minHour: null,
				minTime: Number(new Date()),
				showPicker: false,
				showPickerBegin: false,
				defaultTime: "",

				signinTaskList: [],
				signinTaskTotal: 0,
				signinTaskPageDTO: {
					classId: null,
					pageNum: 1,
					pageSize: 10
				},
				dataNotMore: false,
				status: 'loadmore',
				showTaskInfo: false,
				signinRecordList: [],

				columns: [
					[{
						id: '0',
						name: "默认"
					}, {
						id: '1',
						name: "定位"
					}, {
						id: '2',
						name: "拍照"
					}, ]
				],
				showSigninTypePicker: false,
				signinTypePickerValue: "",
				showStudentList: false,
				studentList: [],
			}
		},
		onLoad(option) {
			this.classId = option.classId
			this.publishSigninForm.classId = option.classId
			this.signinTaskPageDTO.classId = option.classId
			this.className = option.className
			// 获取系统默认时间
			var date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
				minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
				second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
			month >= 1 && month <= 9 ? (month = "0" + month) : "";
			day >= 0 && day <= 9 ? (day = "0" + day) : "";
			var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
			this.defaultTime = timer
			this.minHour = hour
		},
		created() {
			this.loadSigninPage()
		},
		methods: {
			loadSigninPage() {
				signinTaskPage(this.signinTaskPageDTO).then(res => {
					if (res.code === 200) {
						this.signinTaskList = res.rows
						this.signinTaskTotal = res.total
					}
				})
			},
			// 发起签到
			handlePublishSignin() {
				this.showPublish = true
			},
			close() {
				this.showPublish = false
			},
			open() {},
			// 提交签到任务
			confirmPublishSignin() {
				console.log(this.publishSigninForm)
				addSigninTask(this.publishSigninForm).then(res => {
					if (res.code === 200) {
						this.showPublish = false
						this.$refs.uToast.show({
							type: "success",
							message: "发布成功"
						});
					}
				})
			},
			cancel() {
				this.showPicker = false
			},
			cancelBegin() {
				this.showPickerBegin = false
			},
			hideKeyboard() {
				uni.hideKeyboard()
			},
			confirm() {
				this.showPicker = false
			},
			confirmBegin() {
				this.showPickerBegin = false
			},
			formatter(type, value) {
				if (type === 'hour') {
					return `${value}时`
				}
				if (type === 'minute') {
					return `${value}分`
				}
				return value
			},
			//查看签到列表
			handleOpenTaskInfo(item) {
				console.log(item.taskId)
				this.showTaskInfo = true
				signinTaskRecordList(item.taskId).then(res => {
					if (res.code === 200) {
						this.signinRecordList = res.data
					}
				})
			},
			closeTaskInfo() {
				this.showTaskInfo = false
				this.signinRecordList = []
			},
			openTaskInfo() {
				this.showTaskInfo = true
			},
			closeSigninTypePicker() {
				this.showSigninTypePicker = false
			},
			cancelSigninTypePicker() {
				this.showSigninTypePicker = false
			},
			confirmSigninTypePicker(item) {
				console.log(item.value[0].id)
				this.signinTypePickerValue = item.value[0].name
				this.publishSigninForm.signinType = item.value[0].id
				this.showSigninTypePicker = false
			},
			imgPreview(pictureUrl) {
				var array = []
				array[0] = pictureUrl
				uni.previewImage({
					indicator: "number",
					loop: true,
					urls: array
				})
			},
			loadMore() {
				this.signinTaskPageDTO.pageNum++
				signinTaskPage(this.signinTaskPageDTO).then(res => {
					if (res.code === 200) {
						this.signinTaskList = this.signinTaskList.concat(res.rows)
						this.signinTaskTotal = res.total
						if (res.rows.length < this.signinTaskPageDTO.pageSize) {
							// 无更多数据
							this.dataNotMore = true
						}
					}
				})
			},
			handleStudentList() {
				this.showStudentList = true
				classStudentList(this.classId).then(res => {
					if (res.code === 200) {
						this.studentList = res.data
					}
				})
			},
			closeStudentList() {
				this.showStudentList = false
			},
			openStudentList() {
				this.showStudentList = true
			},
			// 设为班长
			handleAuthMonitor(studentId) {
				console.log(studentId)
				authMonitor(this.classId, studentId).then(res => {
					if (res.code === 200) {
						this.$refs.uToast.show({
							type: "success",
							message: "操作成功"
						});
						classStudentList(this.classId).then(res => {
							if (res.code === 200) {
								this.studentList = res.data
							}
						})
					}
				})
			}
		},
	}
</script>

<style lang="scss">
	.task-item {
		margin: 0 1rem 1rem;
		border-radius: .5rem;
		background-color: white;

		.task-end {
			color: white;
			background-color: green;
			position: absolute;
			right: 5px;
			top: 5px;
			padding: 5px;
			border-radius: 5px;
		}
	}

	.task-info-popup {
		height: 70vh;
		padding: 1rem 0;
	}

	.signin-record {
		margin-top: 1rem;

		.signin-record-item {
			padding: 0.5rem 1rem 0.5rem;

			&:hover {
				transition: all .3s linear;
				background-color: #e4e4e4;
			}

			.left {}

			.center {
				margin-left: 1rem;
			}

			.right {}
		}

	}

	.tips-green {
		color: green;
	}

	.tips-red {
		color: red;
	}

	.signin-complate {
		position: absolute;
		right: 5px;
		bottom: 5px;
		color: green;
	}
</style>