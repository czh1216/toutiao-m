import storage from './storage'
const TOKN_KEY = 'HMM'
export const getToken = () => storage.get(TOKN_KEY)
export const setToken = (token) => storage.set(TOKN_KEY, token)
export const removeToken = () => storage.remove(TOKN_KEY)

// 搜索历史
const TOUTIAO_HISTORY = 'HEIMA_TOUTIAO_HISTORY'
export const setHistory = (history) => storage.set(TOUTIAO_HISTORY, history)
export const getHistory = () => storage.get(TOUTIAO_HISTORY)
export const removeHistory = () => storage.remove(TOUTIAO_HISTORY)
// console.log(getHistory())
