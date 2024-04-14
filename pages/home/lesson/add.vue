<template>
	<view class="">
		<u-navbar title="新建课程" :autoBack="true" safeAreaInsetTop fixed placeholder @rightClick="rightClick">
		</u-navbar>
		<view class="p1rem" style="background-color: white;border-radius: .5rem;margin: 1rem;">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="left" :model="model1" ref="form1">
				<u-form-item label="课程名称:" prop="lessonName" borderBottom labelWidth="80" ref="item1">
					<u--input v-model="model1.lessonName" border="none" placeholder="请输入课程名称"></u--input>
				</u-form-item>
				<u-form-item label="图标" prop="cover" borderBottom @click="showLessonIcon = true; hideKeyboard()"
					ref="item1">
					<u--input v-model="model1.cover" disabled disabledColor="#ffffff" placeholder="请选择图标"
						border="none"></u--input>
					<u-icon slot="right" name="arrow-right"></u-icon>
				</u-form-item>
				<u-form-item label="简介" prop="lessonDesc" borderBottom ref="item3">
					<u--textarea placeholder="不低于3个字" v-model="model1.lessonDesc" count></u--textarea>
				</u-form-item>
			</u--form>
			<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="submit"></u-button>
			<u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" :overlay="true" :closeable="true"
				:closeOnClickOverlay="true" :show="showLessonIcon" :round="10" :mode="'bottom'" @close="close"
				@open="open">
				<view class="p1rem">
					<u-grid :border="false" @click="click">
						<u-grid-item v-for="(item,baseListIndex) in lessonIconList" :key="baseListIndex">
							<u-avatar style="margin-top: 1rem;" :src="item.remoteUrl" :name="item.remoteUrl"></u-avatar>
						</u-grid-item>
					</u-grid>
					<!-- <u-toast ref="uToast" /> -->
				</view>
			</u-popup>
		</view>

	</view>

</template>

<script>
	import {
		allLessonIcon
	} from "@/api/app/lessonIcon.js";
	import {
		addLesson
	} from "@/api/app/lesson.js";

	export default {
		data() {
			return {
				showLessonIcon: false,
				model1: {
					lessonName: "",
					cover: "",
					lessonDesc: '',
				},
				lessonIconList: [],

			}
		},
		onReady() {
			// 如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则
			// this.$refs.form1.setRules(this.rules)
		},
		created() {
			this.initLessonIcon()
		},
		methods: {
			initLessonIcon() {
				allLessonIcon().then(res => {
					if (res.code === 200) {
						this.lessonIconList = res.rows
					}
				})
			},
			click(name) {
				// this.$refs.uToast.success(`点击了第${name}个`)
				this.model1.cover = this.lessonIconList[name].remoteUrl
				this.showLessonIcon = false
			},
			rightClick() {

			},
			close() {
				this.showLessonIcon = false
			},
			open() {},
			submit() {
				console.log(this.model1)
				addLesson(this.model1).then(res => {
					if (res.code === 200) {
						this.$modal.showToast('创建成功')
						this.$tab.reLaunch('/pages/home/index')
					}
				})
			},
			hideKeyboard() {
				uni.hideKeyboard()
			}
		},
	}
</script>

<style lang="scss">

</style>