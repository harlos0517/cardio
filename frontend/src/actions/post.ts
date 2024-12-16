import { fetchAPI } from '@/api'

export const createPost = async(content: string) =>
  await fetchAPI('post/create', { method: 'POST', body: JSON.stringify({ content }) })
