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

// 班级学生列表
export function classStudentList(classId) {
	return request({
		'url': '/app/lessonClassStudent/studentList/' + classId,
		'method': 'get'
	})
}
// 设为班长
export function authMonitor(classid, userId) {
	return request({
		'url': '/app/lessonClassStudent/authMonitor/' + classid + "/" + userId,
		'method': 'get'
	})
}