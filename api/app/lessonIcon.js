import request from '@/utils/request'

export function allLessonIcon() {
	return request({
		'url': '/app/lessonIcon/all',
		'method': 'get'
	})
}
