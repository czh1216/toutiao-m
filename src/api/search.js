import request from '@/utils/request'

export const getSearch = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q: q
    }
  })
}

export const grtSearchFn = (q, page, perPage) => {
  return request({
    url: '/v1_0/search',
    params: {
      q,
      page,
      per_page: perPage
    }
  })
}
