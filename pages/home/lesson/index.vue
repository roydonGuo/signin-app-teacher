<template>
	<view class="lesson-page">
		<u-navbar :fixed="true" :safeAreaInsetTop="true" :placeholder="true" :title="lessonName" @leftClick="leftClick"
			@rightClick="rightClick" :autoBack="true">
			<view slot=right>
				<u-icon name="search" color="#2979ff" size="28"></u-icon>
			</view>
		</u-navbar>
		<view class="p1rem">
			<text>课程信息</text>
			<view v-if="lessonInfo" class="lesson-info">
				<view class="left">
					<u-avatar class="cover" slot="icon" shape="square" size="35" :src="lessonInfo.cover"
						customStyle=""></u-avatar>
				</view>
				<view class="right">
					<view class="lesson_name"><text>{{lessonInfo.lessonName}}</text></view>
					<view><text>班级数: {{lessonInfo.classCount}}</text></view>
					<view class="info"><text>创建时间: {{lessonInfo.createTime}}</text></view>
				</view>
			</view>
			<view>
				<text>课程班级</text>
				<view>
					<view class="less-class" v-for="(item, index) in lessonClassList" :key="index"
						@click="handleRouterClassinfo(item)">
						<view class="unique-code ">
							<text>唯一标识：</text>
							<text class="code">{{item.uniqueCode}}</text>
						</view>
						<view class="info">
							<view>
								<text>班级名称：<text class="fs1 fw600">{{item.className}}</text></text>
							</view>
							<view>
								<text>班级人数：{{item.studentCount}}</text>
							</view>
							<view>
								<text>创建时间：{{item.createTime}}</text>
							</view>
						</view>
					</view>
					<u-loadmore :status="status" @click="handleLoadMore" />
				</view>
				<view class="p1rem">
					<u-button style="width: 400rpx;" :throttleTime="1000" type="primary" icon="plus-circle-fill"
						text="添加班级" @click="handleAddLessonClass"></u-button>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		lessonInfo
	} from "@/api/app/lesson"
	import {
		LessonClassPage
	} from "@/api/app/lessonClass"

	export default {
		data() {
			return {
				lessonId: null,
				lessonName: null,
				lessonInfo: null,
				lessonClassList: [],
				lessonClassTotal: 0,
				lessonClassQuery: {
					lessonId: null,
					pageNum: 1,
					pageSize: 10
				},
				status: 'loadmore',
			}
		},
		onLoad(option) {
			this.lessonId = option.lessonId
			this.lessonClassQuery.lessonId = option.lessonId
			this.lessonName = option.lessonName
		},
		created() {
			this.getLessonInfo()
		},
		methods: {
			leftClick() {
				console.log('leftClick');
			},
			rightClick() {
				console.log('rightClick');
			},
			// 获取课程信息
			getLessonInfo() {
				lessonInfo(this.lessonId).then(res => {
					if (res.code === 200) {
						this.lessonInfo = res.data
					}
				})
				LessonClassPage(this.lessonClassQuery).then(res => {
					if (res.code === 200) {
						this.lessonClassList = res.rows
						this.lessonClassTotal = res.total
						if (res.rows.length < res.total) {
							this.status = 'nomore';
						}
					}
				})
			},
			handleLoadMore() {
				this.status = 'loading';
				this.lessonClassQuery.pageNum++;
				LessonClassPage(this.lessonClassQuery).then(res => {
					if (res.code === 200) {
						this.lessonClassList = this.lessonClassList.concat(res.rows)
						this.lessonClassTotal = res.total
						if (this.lessonClassList.length == res.total) {
							this.status = 'nomore';
						} else {
							this.status = 'loading';
						}
					}
				})
			},
			// 添加班级
			handleAddLessonClass() {
				this.$tab.navigateTo(`/pages/home/lesson/addClass?lessonId=${this.lessonId}`)
			},
			// 跳转班级详情
			handleRouterClassinfo(item) {
				this.$tab.navigateTo(`/pages/home/lesson/classinfo?classId=${item.classId}&className=${item.className}`)
			},

		},

	}
</script>

<style lang="scss">
	.lesson-info {
		display: flex;
		align-items: center;
		margin: 1rem 0;
		border-radius: 0.5rem;
		padding: 1rem;
		background-color: white;
		transition: all .3s ease;

		&:hover {
			box-shadow: none;
		}

		.left {
			.lesson_name {
				font-size: 1.2rem;
			}
		}

		.right {
			margin-left: 1rem;
		}
	}

	.less-class {
		display: flex;
		align-items: center;
		padding: 1rem;
		border-radius: 0.5rem;
		background-color: white;
		margin-bottom: 1rem;

		.unique-code {
			display: flex;
			padding: .5rem;
			flex-direction: column;

			.code {
				border-radius: 0.5rem;
				text-align: center;
				color: white;
				padding: .5rem;
				background-color: gray;
			}
		}

		.info {}
	}
</style>