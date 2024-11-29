import { fetchAPI } from '@/api'

export const getUserInfo = async() =>
  await fetchAPI('user/me')
