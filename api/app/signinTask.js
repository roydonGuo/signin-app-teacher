import request from '@/utils/request'


// 新增
export function addSigninTask(data) {
	return request({
		'url': '/app/signinTask',
		'method': 'post',
		'data': data
	})
}
// 分页
export function signinTaskPage(data) {
	return request({
		'url': '/app/signinTask/page',
		'method': 'post',
		'data': data
	})
}
// 签到列表
export function signinTaskRecordList(taskId) {
	return request({
		'url': '/app/signinTask/record/' + taskId,
		'method': 'get'
	})
}