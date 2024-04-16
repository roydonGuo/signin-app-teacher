import request from '@/utils/request'

export function listAppNotice(query) {
  return request({
    url: '/app/notice/banner',
    method: 'get',
    params: query
  })
}