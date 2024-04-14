import request from '@/utils/request'

// 分页我的课程
export function myLessonPage(data) {
	return request({
		'url': '/app/lesson/my-page',
		'method': 'post',
		'data': data
	})
}

// 新增课程
export function addLesson(data) {
	return request({
		'url': '/app/lesson',
		'method': 'post',
		'data': data
	})
}
// 课程信息
export function lessonInfo(lessonId) {
	return request({
		'url': '/app/lesson/' + lessonId,
		'method': 'get'
	})
}