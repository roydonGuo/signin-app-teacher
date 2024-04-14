<template>
	<view class="home-page">
		<!-- 2.0.19支持autoBack，默认为false -->
		<u-navbar fixed :placeholder="true" title="" leftText="首页" @leftClick="leftClick" @rightClick="rightClick"
			:autoBack="false">
			<view slot=left>
				<u-icon name="list" color="#2979ff" size="28"></u-icon>
			</view>
			<view slot=right>
				<u-icon name="search" color="#2979ff" size="28"></u-icon>
			</view>
		</u-navbar>
		<!-- 教师端展示内容 -->
		<view>
			<view>
				<!-- 轮播图 -->
				<!-- uni-swiper-dot class="uni-swiper-dot-box" :info="data" :current="current" field="content">
					<swiper class="swiper-box" :current="swiperDotIndex" @change="changeSwiper">
						<swiper-item v-for="(item, index) in data" :key="index">
							<view class="swiper-item" @click="clickBannerItem(item)">
								<image :src="item.image" mode="aspectFill" :draggable="false" />
							</view>
						</swiper-item>
					</swiper>
				</uni-swiper-dot> -->
				<u-swiper :list="swiperData" indicator indicatorMode="line" circular></u-swiper>
			</view>
			<view>
				<uni-section title="我的课程" type="line" style="margin-bottom: 1rem;"></uni-section>
				<!-- <view class="lesson-nav">
				<text>我的课程</text>

			</view> -->
				<u-skeleton :loading="loading" :animate="true" rows="3">
					<view class="lesson-container">
						<view class="lesson cbx" v-for="(item, index) in lessonList" :key="item.lessonId"
							@click="handleRouteLesson(item)">
							<view class="left">
								<u-avatar class="cover" slot="icon" shape="square" size="35" :src="item.cover"
									customStyle=""></u-avatar>
							</view>
							<view class="right">
								<view class="lesson_name fw600"><text>{{item.lessonName}}</text></view>
								<view><text>班级数: {{item.classCount}}</text></view>
								<view class="info"><text>创建时间: {{item.createTime}}</text></view>
							</view>
						</view>
					</view>
				</u-skeleton>
				<view class="p1rem">
					<u-button style="width: 400rpx;" :throttleTime="1000" type="primary" icon="plus-circle-fill"
						text="新建课程" @click="handleAddLesson"></u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		myLessonPage
	} from "@/api/app/lesson"

	export default {
		data() {
			return {
				loading: true,
				lessonPageDTO: {
					pageNum: 1,
					pageSize: 10
				},
				lessonList: {},
				lessonTotal: null,
				status: 'more',
				current: 0,
				swiperDotIndex: 0,
				data: [{
						image: '/static/images/banner/banner01.jpg'
					},
					{
						image: '/static/images/banner/banner02.jpg'
					},
					{
						image: '/static/images/banner/banner03.jpg'
					}
				],
				swiperData: [
					'https://cdn.uviewui.com/uview/swiper/swiper1.png',
					'https://cdn.uviewui.com/uview/swiper/swiper2.png',
					'https://cdn.uviewui.com/uview/swiper/swiper3.png'
				],
			}
		},
		created() {
			// this.getCode()
			this.initMyLesson()
		},
		methods: {
			initMyLesson() {
				this.loading = true
				myLessonPage(this.lessonPageDTO).then(res => {
					if (res.code === 200) {
						this.lessonList = res.rows
						this.lessonTotal = res.total
						this.loading = false
					}
				})
			},
			leftClick() {
				console.log('leftClick');
			},
			rightClick() {
				console.log('rightClick');
			},
			onReachBottom() {
				this.status = 'loading'; //加载中状态
				// this.status = 'noMore'; //加载完状态
			},
			onPullDownRefresh() {
				console.log("下拉刷新")
				setTimeout(() => {
					//结束下拉刷新
					uni.stopPullDownRefresh();
				}, 1000);
			},
			clickBannerItem(item) {
				console.info(item)
			},
			changeSwiper(e) {
				this.current = e.detail.current
			},
			handleRouteLesson(item) {
				console.log(item.lessonId)
				console.log(item.lessonName)
				// uni.navigateTo({
				// 		url: `/pages/home/lesson/index?lessonId=${item.lessonId}&lessonName=${item.lessonName}`
				// 	});
				this.$tab.navigateTo(`/pages/home/lesson/index?lessonId=${item.lessonId}&lessonName=${item.lessonName}`)
			},
			// 创建课程
			handleAddLesson() {
				this.$tab.navigateTo(`/pages/home/lesson/add`)
			},

		},

	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
		color: #8f8f94;
	}

	.grid-item-box {
		flex: 1;
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 15px 0;
	}

	.uni-margin-wrap {
		width: 690rpx;
		width: 100%;
	}

	.swiper {
		height: 300rpx;
	}

	.swiper-box {
		height: 150px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: #fff;
		height: 300rpx;
		line-height: 300rpx;
	}

	@media screen and (min-width: 500px) {
		.uni-swiper-dot-box {
			width: 400px;
			/* #ifndef APP-NVUE */
			margin: 0 auto;
			/* #endif */
			margin-top: 8px;
		}

		.image {
			width: 100%;
		}
	}

	.lesson-nav {
		padding: .5rem;
	}

	.lesson-container {
		.lesson {
			display: flex;
			align-items: center;
			margin: 0 1rem 1rem;
			border-radius: 0.5rem;
			padding: .5rem;
			background-color: aliceblue;
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
				margin-left: .5rem;
			}
		}
	}
</style>