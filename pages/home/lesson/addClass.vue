<template>
	<view class="">
		<u-navbar title="创建班级" :autoBack="true" safeAreaInsetTop fixed placeholder>
		</u-navbar>
		<view class="p1rem" style="background-color: white;border-radius: .5rem;margin: 1rem;">
			<!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
			<u--form labelPosition="left" :model="createClassDTO" ref="form1">
				<u-form-item label="班级名称:" prop="className" borderBottom labelWidth="80" ref="item1">
					<u--input v-model="createClassDTO.className" border="none" placeholder="请输入班级名称"></u--input>
				</u-form-item>
			</u--form>
			<u-button type="primary" text="提交" customStyle="margin-top: 50px" @click="submit"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		addLessonClass
	} from "@/api/app/lessonClass.js";

	export default {
		data() {
			return {
				createClassDTO: {
					lessonId: "",
					className: "",
				},
			}
		},
		onLoad(option) {
			this.createClassDTO.lessonId = option.lessonId
		},
		created() {

		},
		methods: {
			submit() {
				addLessonClass(this.createClassDTO).then(res=>{
					if (res.code === 200) {
						this.$modal.showToast('创建成功')
						// this.$tab.reLaunch('/pages/home/lesson/index')
						uni.navigateBack()
					}
				})
			},
		},
	}
</script>

<style lang="scss">

</style>