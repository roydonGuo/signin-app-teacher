import request from '@/utils/request'

// 分页课程班级
export function LessonClassPage(data) {
	return request({
		'url': '/app/lessonClass/page',
		'method': 'post',
		'data': data
	})
}

// 创建课程班级
export function addLessonClass(data) {
	return request({
		'url': '/app/lessonClass',
		'method': 'post',
		'data': data
	})
}
